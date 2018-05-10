""" Build index from directory listing

Credit: Matthew Brett and Nathan Arthur
https://stackoverflow.com/questions/39048654/how-to-enable-directory-indexing-on-github-pages

make_index.py </path/to/directory> [--header <header text>]
"""

INDEX_TEMPLATE = r"""
[
% for obj in object_list:
    {
        "title": "${obj['title']}",
        "file": "${obj['file']}",
        "description": "${obj['description']}",
        "tags": ${obj['tags']}
    }${'' if loop.last else ','}
% endfor
]
"""

EXCLUDED = ['index.html','archive.html','getOldPosts.js','w3-include-HTML.js']
title_id = "meta-title"
description_id = "meta-description"
tags_id = "meta-tags"


import os
import json
import argparse
from bs4 import BeautifulSoup

# May need to do "pip install mako"
from mako.template import Template


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("directory")
    parser.add_argument("--header")
    parser.add_argument("--output")
    args = parser.parse_args()

    ### Read all filenames
    fnames = [fname for fname in sorted(os.listdir(args.directory), reverse=True)
              if fname not in EXCLUDED]
    header = (args.header  if args.header else os.path.basename(args.directory))

    if args.directory[len(args.directory)-1] != '/':
        args.directory = args.directory + '/'

    ### Gather information
    files = []


    for name in fnames:
        fpath = args.directory + name
        with open(fpath, 'r') as fp:
            obj = {}
            soup = BeautifulSoup(fp, "lxml")
            try:
                title = soup.find(id=title_id).text
                description = soup.find(id=description_id).text
                tags = json.dumps(soup.find(id=tags_id).text.split())
            except AttributeError:
                title = ""
                description = ""
                tags = [""]


            
            obj["title"] = title
            obj["file"] = fpath
            obj["description"] = description

            # could probably just use this for the whole process tbh
            obj["tags"] = tags
            files.append(obj)

    ### Write information out to JSON file
    if args.output:
        with open(args.output, "w") as fp:
            fp.write(Template(INDEX_TEMPLATE).render(object_list=files))
    else:
        print(Template(INDEX_TEMPLATE).render(object_list=files))


if __name__ == '__main__':
    main()