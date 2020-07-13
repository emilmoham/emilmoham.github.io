""" Build index from directory listing

Credit: Matthew Brett and Nathan Arthur
https://stackoverflow.com/questions/39048654/how-to-enable-directory-indexing-on-github-pages

I skip the string formatting as I only need a JSON file corresponding to the
directory and some meta information within the files.
"""
import os
import json
import argparse
from bs4 import BeautifulSoup
from datetime import datetime

EXCLUDED = []

meta_tag_names = ["title", "description", "tags"]

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("directory")
    # parser.add_argument("--header")
    parser.add_argument("--output")
    args = parser.parse_args()

    # Append '/' to directory if needed
    if args.directory[len(args.directory)-1] != '/':
        args.directory = args.directory + '/'

    # Read all filenames
    fnames = [fname for fname in sorted(os.listdir(args.directory), reverse=True)
            if fname not in EXCLUDED]

    files_json = []

    for file_name in fnames:
        link_num = file_name.rstrip(".html")
        date = datetime.strptime(link_num, "%Y%m%d").strftime("%B %d, %Y")
        fpath = args.directory + file_name

        obj = {}
        with open(fpath) as fp:
            soup = BeautifulSoup(fp, "lxml")
            for name in meta_tag_names:
                try:
                    obj[name] = soup.find("meta", {"name": name})['content']
                except TypeError:
                    obj[name] = ""

            obj["tags"] = obj["tags"].split()
            obj["link"] = link_num
            obj["date"] = date

        files_json.append(json.dumps(obj))

    if args.output:
        with open(args.output, "w") as fp:
            fp.write("[\n")
            for file in files_json[:-1]:
                fp.write(str(file)+",\n")
            fp.write(str(files_json[-1]))
            fp.write("\n]")
    else:
        print ("[")
        for file in files_json[:-1]:
            print(str(file)+",")
        print(str(files_json[-1]))
        print("]")


if __name__ == '__main__':
    main()
