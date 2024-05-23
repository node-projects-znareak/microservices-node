set type=%1

IF "%type%" EQU "install" (
    set command=npm install
) ELSE (
    set command=bun run %type%
)

IF "%type%" EQU "" (
    set command=bun start
)

start cmd /k "cd client && %command% && exit"
start cmd /k "cd comments && %command% && exit"
start cmd /k "cd event-bus && %command% && exit
start cmd /k "cd posts && %command% && exit
start cmd /k "cd query && %command% && exit