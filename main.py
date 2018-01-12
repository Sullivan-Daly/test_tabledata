#!/usr/bin/env python
# -*- coding:utf-8 -*-

from flask import Flask, render_template, jsonify, request
from data_handle import *

app = Flask(__name__)

class CTable:
    def __init__(self):
        self.data = []
        self.ok = []
        self.nok = []
        self.ok_id = []
        self.nok_id = []

def config_reader():
    t_config = {}
    x_config = configparser.ConfigParser()
    x_config.read('config.ini')

    t_config['load__option'] = x_config['LOAD']['OPTION']
    t_config['load__path_file'] = x_config['LOAD']['PATH_FILE']
    t_config['load__path_image'] = x_config['LOAD']['PATH_IMAGE']
    t_config['load__es_url'] = x_config['LOAD']['ES_URL']
    t_config['load__es_index'] = x_config['LOAD']['ES_INDEX']
    t_config['load__es_doctype'] = x_config['LOAD']['ES_DOCTYPE']
    t_config['load__es_tri_name'] = x_config['LOAD']['ES_TRI_NAME']
    t_config['load__es_limit'] = x_config['LOAD']['ES_LIMIT']
    t_config['load__es_granularity'] = x_config['LOAD']['ES_GRANULARITY']
    t_config['load__es_date_begin'] = x_config['LOAD']['ES_DATE_BEGIN']
    t_config['load__es_date_end'] = x_config['LOAD']['ES_DATE_END']
    t_config['load__mongo_url'] = x_config['LOAD']['MONGO_URL']
    t_config['load__mongo_db'] = x_config['LOAD']['MONGO_DB']
    t_config['load__mongo_collection'] = x_config['LOAD']['MONGO_COLLECTION']
    t_config['display__limit'] = x_config['DISPLAY']['LIMIT']
    return t_config

t_config = config_reader()

data = []


tData = CTable()
if t_config['load__option'] == '2':
   handleData = CElastic(t_config, tData)
if handleData.get_tri_exist() == 0:
   handleData.init_tri()

@app.route("/get_tweets", methods=['GET', 'POST'])
def ajax_get_tweets():
    return (jsonify(handleData.get_tweets(int(request.args['start']), int(request.args['length']))))

@app.route("/get_ok", methods=['GET', 'POST'])
def ajax_get_ok():
    return (jsonify(handleData.get_ok(int(request.args['start']), int(request.args['length']))))

@app.route("/get_nok", methods=['GET', 'POST'])
def ajax_get_nok():
    return (jsonify(handleData.get_nok(int(request.args['start']), int(request.args['length']))))

@app.route('/save_element', methods=['POST'])
def save_element():
    handleData.save_data(request.values['id_str'],int(request.values['value']))
    return ""

@app.route('/table_new.html')
def table_new():
    return render_template('table_new.html')

@app.route('/table_ok.html')
def table_ok():
    return render_template('table_ok.html')

@app.route('/table_nok.html')
def table_nok():
    return render_template('table_nok.html')

@app.route("/")
def test():
    return render_template('test.html')

# /////////////////////////////////////////////////////////////////////////////////

@app.route("/test2")
def test2():
    return render_template('test2.html')

@app.route('/table_tmp.html')
def table_tmp():
    return render_template('table_tmp.html')

@app.route('/scroller.html')
def scroller_test():
    return render_template('scroller_test.html')

@app.route("/get_tweets", methods=['GET', 'POST'])
def test_ajax():
    return (jsonify(handleData.get_tweets(int(request.args['start']), int(request.args['length']))))

if __name__ == '__main__':
    app.run(debug=False)