#!/bin/bash
echo "Jekyll Install";
gem install bundler jekyll;
bundle install;
jekyll serve --port 80 --host 10.10.10.196