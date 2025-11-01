// handlers.test.js
jest.mock('./database.js', () => {
    const con = { query: jest.fn(), release: jest.fn() };
    const pool = { getConnection: jest.fn((cb) => cb(null, con)) };
    return { pool, __con: con, __pool: pool };
});

const db = require('./database.js');
const { addPassword } = require('./main_controller.js');

function mockRes() {
    const res = {};
    res.status = jest.fn(() => res);
    res.send = jest.fn(() => res);
    return res;
}

describe('addPassword', () => {
    beforeEach(() => {
        db.__con.query.mockReset();
        db.__con.release.mockReset();
        db.__pool.getConnection.mockImplementation((cb) => cb(null, db.__con));
        process.env.PASSWORD_TABLE_NAME = 'Passwords';
    });

    test('responds 200 on success', () => {
        db.__con.query.mockImplementation((sql, cb) => cb(null, { affectedRows: 1 }));

        const req = {
            body: { site: 'example.com', username: 'alice', password: 'secret' },
            session: { userId: 42 },
        };
        const res = mockRes();

        addPassword(req, res);

        expect(db.__pool.getConnection).toHaveBeenCalled();
        expect(db.__con.query).toHaveBeenCalledTimes(1);

        const [sql] = db.__con.query.mock.calls[0];
        expect(sql).toContain('INSERT INTO Passwords');
        expect(sql).toContain("(42, 'example.com', 'alice', 'secret')");

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Successfully added password');
        expect(db.__con.release).toHaveBeenCalled();
    });

    test('responds 500 on query error', () => {
        db.__con.query.mockImplementation((sql, cb) => cb(new Error('boom')));

        const req = {
            body: { site: 'x', username: 'y', password: 'z' },
            session: { userId: 1 },
        };
        const res = mockRes();

        addPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send.mock.calls[0][0]).toMatch(/Error encountered whilst adding user/);
    });

    test('throws when getConnection fails', () => {
        db.__pool.getConnection.mockImplementation((cb) => cb(new Error('no connect')));
        const req = { body: {}, session: { userId: 1 } };
        const res = mockRes();

        expect(() => addPassword(req, res)).toThrow('no connect');
    });
});
