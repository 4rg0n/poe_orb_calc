#!/bin/bash
for i in *.png; do 
    convert "$i" -resize 24x24 "24px/$(basename "$i")";
done 
