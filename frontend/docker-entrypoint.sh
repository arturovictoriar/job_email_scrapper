#!/usr/bin/env bash

sed -i "s/localhost/ec2-54-144-27-221.compute-1.amazonaws.com/g" pages/index.js
npm run build
npm start