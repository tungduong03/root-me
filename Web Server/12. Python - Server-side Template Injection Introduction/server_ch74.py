#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Author: Podalirius

import jinja2
from flask import Flask, flash, redirect, render_template, request, session, abort

app = Flask(__name__, template_folder="./templates/", static_folder="./static/")
app.config['DEBUG'] = False

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html")

@app.route("/", methods=['GET', 'POST'])
def register():
    return render_template("index.html")

@app.route("/preview", methods=['GET', 'POST'])
def preview():
    print(request.form)
    if request.method == "POST":
        if "title" in request.form and len(request.form["title"]) != 0 and \
           "content" in request.form and len(request.form["content"]) != 0:
            if len(request.form["title"]) > 20:
                return {'error': "Field 'title' is too long."}
            if len(request.form["content"]) > 512:
                return {'error': "Field 'content' is too long."}
            return {
                'title': request.form["title"],
                #đoạn này tạo content dựa vào Template của Jinja2
                'content': jinja2.Template(request.form["content"]).render()
            }
        else:
            return render_template("index.html", error="Missing fields in the application form!")
    elif request.method == 'GET':
        return redirect("/")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=59074)
