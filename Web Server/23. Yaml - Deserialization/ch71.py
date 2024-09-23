#!/usr/bin/python3
# -*- coding: utf-8 -*-
# File name          : app.py
# Author             : Nishacid
# Python Version     : 3.*

from flask import Flask, render_template, request, redirect
import yaml
import base64

app = Flask(__name__, static_url_path='/static', static_folder='static')
app.config['DEBUG'] = False

@app.route("/")
def start():
    return redirect("/eWFtbDogV2UgYXJlIGN1cnJlbnRseSBpbml0aWFsaXppbmcgb3VyIG5ldyBzaXRlICEg", code=302)

@app.route("/<input>", methods=['GET'])
def deserialization(input):
    try:
        if not input:
            return render_template("/index.html")
        yaml_file = base64.b64decode(input)
        content = yaml.load(yaml_file)
        return render_template("index.html", content=content['yaml'])
    except:
        content = "Unable to deserialize the object"
        return render_template("index.html", content=content)

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=59071)
