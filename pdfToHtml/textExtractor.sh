#!/bin/bash

for entry in ./PDFs/*
  do
    html="./html/${entry:7:5}.html"
    java -jar pdfbox-app-2.0.5.jar ExtractText -html $entry $html
done
