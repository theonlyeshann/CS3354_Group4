// loginUser.test.js
jest.mock('./database.js', () => {
    const con = { query: jest.fn(), release: jest.fn() };
    const pool = { getConnection: jest.fn((cb) => cb(null, con)) };
    return { pool, __con: con, __pool: pool };
});

const db = require('./database.js');
const { loginUser } = require('./auth_controller.js');

function mockRes() {
    const res = {};
    res.status = jest.fn(() => res);
    res.send = jest.fn(() => res);
    res.redirect = jest.fn(() => res);
    return res;
}

describe('loginUser', () => {
    beforeEach(() => {
        db.__con.query.mockReset();
        db.__con.release.mockReset();
        db.__pool.getConnection.mockImplementation((cb) => cb(null, db.__con));
        process.env.LOGIN_TABLE_NAME = 'Login';
    });

    test('redirects on successful login', () => {
        // Simulate a correct user/password match
        const fakeResults = [{ UserID: 1, Username: 'alice', Password: 'secret' }];
        db.__con.query.mockImplementation((sql, cb) => cb(null, fakeResults));

        const req = {
            body: { username: 'alice', password: 'secret' },
            session: {},
        };
        const res = mockRes();

        loginUser(req, res);

        // Should have connected and queried once
        expect(db.__pool.getConnection).toHaveBeenCalled();
        expect(db.__con.query).toHaveBeenCalledTimes(1);

        // Should redirect to /main
        expect(res.redirect).toHaveBeenCalledWith('/main');
        // Should have set the session userId
        expect(req.session.userId).toBe(1);
        // Should have released the connection
        expect(db.__con.release).toHaveBeenCalled();
    });

    test('responds 404 when username not found', () => {
        db.__con.query.mockImplementation((sql, cb) => cb(null, [])); // No results

        const req = {
            body: { username: 'bob', password: 'anything' },
            session: {},
        };
        const res = mockRes();

        loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Could not find username');
    });

    test('responds 400 when password incorrect', () => {
        const fakeResults = [{ UserID: 2, Username: 'bob', Password: 'realpw' }];
        db.__con.query.mockImplementation((sql, cb) => cb(null, fakeResults));

        const req = {
            body: { username: 'bob', password: 'wrongpw' },
            session: {},
        };
        const res = mockRes();

        loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Incorrect password');
    });

    test('responds 500 on query error', () => {
        db.__con.query.mockImplementation((sql, cb) => cb(new Error('DB fail')));

        const req = {
            body: { username: 'charlie', password: 'pw' },
            session: {},
        };
        const res = mockRes();

        loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send.mock.calls[0][0]).toMatch(/Error encountered whilst looking for user/);
    });

    test('throws when getConnection fails', () => {
        db.__pool.getConnection.mockImplementation((cb) => cb(new Error('no connect')));

        const req = { body: {}, session: {} };
        const res = mockRes();

        expect(() => loginUser(req, res)).toThrow('no connect');
    });
});
