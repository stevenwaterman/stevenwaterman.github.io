#!/usr/bin/env bash
find ./static/assets/blog -type f -name '*header.png' -execdir convert {} -format jpg -background '#F4F5F6' -alpha remove -alpha off -resize 500x250 th_header.jpg \;