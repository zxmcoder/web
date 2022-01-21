#!/bin/bash

JS_PATH=/home/zxmcoder/web/game/static/js/
JS_PTAH_DIST=${JS_PATH}dist/
JS_PATH_SRC=${JS_PATH}src/

# find $JS_PATH_SRC -type f -name '*.js' | sort | xargs cat | terser -c -m > ${JS_PTAH_DIST}game.js

find $JS_PATH_SRC -type f -name '*.js' | sort | xargs cat > ${JS_PTAH_DIST}game.js


# echo yes | python3 manage.py collectstatic
