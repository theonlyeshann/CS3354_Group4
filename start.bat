@echo off
        echo Hello, running website
        echo:

        cd keysync\client
        echo Successfully found folders
        echo:

        start http://localhost:3000/

        npm run dev

        "open": "http://localhost:3000/"