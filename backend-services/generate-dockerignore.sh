#!/bin/sh -e
# Generate a .dockerignore file that only includes files tracked by git.
#
# Additionally, this also:
#
# - excludes specific files that aren't useful inside Docker build contexts
# - recursively includes src/**, for development convenience

SCRIPT='
1 i # Generated by generate-dockerignore.sh
1 i *

/[.]gitignore$/ d
/^.*[.]md$/ d
/^Dockerfile/ d
/^[.]dockerignore$/ d
/^docker-compose[.]yaml$/ d
/^generate-.*[.]sh$/ d

s#/src/.*#/src/#
s#^#!#
'

git ls-files | sed "$SCRIPT" | uniq >.dockerignore
