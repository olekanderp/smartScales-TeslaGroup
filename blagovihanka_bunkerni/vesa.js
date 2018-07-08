[{"id":"819bfe9c.ed4f","type":"tab","label":"BST106-B68 Bulkweigh"},{"id":"c796563b.4b0948","type":"modbus-client","z":"","name":"Bulkweigh","clienttype":"serial","bufferCommands":true,"stateLogEnabled":false,"tcpHost":"127.0.0.1","tcpPort":"502","serialPort":"/dev/ttyUSB0","serialType":"ASCII","serialBaudrate":"9600","serialDatabits":"8","serialStopbits":"1","serialParity":"none","serialConnectionDelay":"100","unit_id":"1","commandDelay":"100","clientTimeout":"1000","reconnectTimeout":"5000"},{"id":"d13e4573.96b538","type":"ui_tab","z":"","name":"Home","icon":"dashboard"},{"id":"aba36961.e78d08","type":"ui_group","z":"","name":"Default2","tab":"d13e4573.96b538","disp":true,"width":"6"},{"id":"8fdb8974.28cd58","type":"ui_tab","name":"Tab 2","icon":"dashboard","order":2},{"id":"f1f1a16b.d06f4","type":"ui_group","z":"","name":"Default","tab":"d13e4573.96b538","disp":true,"width":"6"},{"id":"d6fb9661.41b6b8","type":"modbus-read","z":"819bfe9c.ed4f","name":"Read current gross","showStatusActivities":true,"showErrors":false,"unitid":"1","dataType":"HoldingRegister","adr":"0","quantity":"4","rate":"500","rateUnit":"ms","server":"c796563b.4b0948","x":130,"y":140,"wires":[["5e31e68b.3dd0d8"],[]]},{"id":"5e31e68b.3dd0d8","type":"function","z":"819bfe9c.ed4f","name":"","func":"flow.set('brutto',msg.payload[1]);\nflow.set('netto',msg.payload[3]);\nreturn msg;","outputs":1,"noerr":0,"x":310,"y":140,"wires":[[]]},{"id":"470df3a8.8b396c","type":"modbus-read","z":"819bfe9c.ed4f","name":"Get current STATUS","showStatusActivities":true,"showErrors":false,"unitid":"1","dataType":"HoldingRegister","adr":"5","quantity":"1","rate":"500","rateUnit":"ms","server":"c796563b.4b0948","x":130,"y":200,"wires":[["33709d86.d8e7f2","49f82b55.241234","55253719.85b5b8"],[]]},{"id":"33709d86.d8e7f2","type":"function","z":"819bfe9c.ed4f","name":"","func":"var temp = msg.payload;\nvar b = [];\nvar alias = {\n    0: 'Авто',\n    1: 'Выполнение',\n    2: 'Последняя порция',\n    3: 'Авария положительного отклонения',\n    4: 'Авария отрицательного отколнения',\n    5: 'Разгрузка',\n    6: 'Разгрузка текущей порции завершена',\n    7: 'Последняя порция завершена',\n    8: 'Пауза',\n    9: 'Авария верхнего предела превышения брутто',\n    10: '',\n    11: '',\n    12: 'Диапазон нулевого веса',\n    13: 'Значение веса стабильно',\n    14: 'Авария перегрузки',\n    15: 'Неисправность контроллера'\n}\nfor(var i = 0; i < 16; i++){\n    \n    //добавим отвес в текущую таблицу\n    var t = {\n        name: alias[i],\n        value: (temp >> i) & 1 \n    }\n    \n    if(i==6 && t.value == 1){\n        flow.get('weights').push(\n            {\n                Date: new Date(),\n                Weight: flow.get('brutto')\n            });\n    }\n    b.push(t);\n}\nflow.set('status',b);\nmsg.payload = b;\nreturn msg;","outputs":1,"noerr":0,"x":310,"y":200,"wires":[["4375b858.b727a8","85a8e103.35f6e"]]},{"id":"4375b858.b727a8","type":"function","z":"819bfe9c.ed4f","name":"","func":"msg.payload = msg.payload[6];\n\nreturn msg;","outputs":1,"noerr":0,"x":576.5,"y":177,"wires":[["fe1ca362.73729"]]},{"id":"fe1ca362.73729","type":"debug","z":"819bfe9c.ed4f","name":"","active":false,"console":"false","complete":"false","x":758.0000076293945,"y":175.75000190734863,"wires":[]},{"id":"90b524c0.1b1ef8","type":"inject","z":"819bfe9c.ed4f","name":"","topic":"","payload":"netto","payloadType":"flow","repeat":"0.5","crontab":"","once":false,"x":227.25000762939453,"y":702.0000095367432,"wires":[["4119b6ec.4690a8","dc57e594.61da18"]]},{"id":"b29c01fa.3b8ac","type":"inject","z":"819bfe9c.ed4f","name":"","topic":"","payload":"brutto","payloadType":"flow","repeat":"0.5","crontab":"","once":false,"x":228.25000762939453,"y":748.0000095367432,"wires":[["ad4c488b.5ad148"]]},{"id":"4119b6ec.4690a8","type":"ui_text","z":"819bfe9c.ed4f","group":"aba36961.e78d08","order":0,"width":0,"height":0,"name":"","label":"Netto","format":"{{msg.payload}}","layout":"row-spread","x":709.3750343322754,"y":717.5000095367432,"wires":[]},{"id":"ad4c488b.5ad148","type":"ui_text","z":"819bfe9c.ed4f","group":"aba36961.e78d08","order":0,"width":0,"height":0,"name":"","label":"Brutto","format":"{{msg.payload}}","layout":"row-spread","x":705.0000114440918,"y":737.5000133514404,"wires":[]},{"id":"9291e6d.5a6cf18","type":"ui_text","z":"819bfe9c.ed4f","group":"aba36961.e78d08","order":0,"width":0,"height":0,"name":"","label":"Сумарний вес","format":"{{msg.payload}}","layout":"row-spread","x":778.7500076293945,"y":477.5000047683716,"wires":[]},{"id":"977d5ccf.bd7b9","type":"ui_text","z":"819bfe9c.ed4f","group":"aba36961.e78d08","order":0,"width":0,"height":0,"name":"","label":"Счетчик Порций","format":"{{msg.payload}}","layout":"row-spread","x":205.6250114440918,"y":587.5000095367432,"wires":[]},{"id":"3b0731d0.edc0fe","type":"modbus-read","z":"819bfe9c.ed4f","name":"10.11.12.13","showStatusActivities":true,"showErrors":false,"unitid":"1","dataType":"HoldingRegister","adr":"10","quantity":"4","rate":"200","rateUnit":"ms","server":"c796563b.4b0948","x":118.75,"y":477.5000057220459,"wires":[["3af8796.b145886","b1600928.ec5bd8","c2cc0bd9.42a7f8"],[]]},{"id":"134a1d3.9fcbbe3","type":"debug","z":"819bfe9c.ed4f","name":"","active":false,"console":"true","complete":"payload","x":572.5000076293945,"y":547.5000057220459,"wires":[]},{"id":"3af8796.b145886","type":"function","z":"819bfe9c.ed4f","name":"сумарний вес","func":"var buf = new ArrayBuffer(4);\nvar intView = new Uint16Array(buf);\nvar fltView = new Uint32Array(buf);\n\nintView[0] = msg.payload[1]; //low\nintView[1] = msg.payload[0]; //high\n\nmsg.payload = parseInt(fltView[0]);\n\n\n\nflow.set('total_netto',msg.payload);\nreturn msg;","outputs":1,"noerr":0,"x":354.37500381469727,"y":483.7500057220459,"wires":[["134a1d3.9fcbbe3"]]},{"id":"73b00efa.cbcc8","type":"debug","z":"819bfe9c.ed4f","name":"","active":false,"console":"true","complete":"payload","x":620.0000076293945,"y":590.0000076293945,"wires":[]},{"id":"b1600928.ec5bd8","type":"function","z":"819bfe9c.ed4f","name":"порци","func":"var buf = new ArrayBuffer(4);\nvar intView = new Uint16Array(buf);\nvar fltView = new Uint32Array(buf);\n\nintView[0] = msg.payload[3]; //low\nintView[1] = msg.payload[2]; //high\n\nmsg.payload = parseInt(fltView[0]);\nreturn msg;","outputs":1,"noerr":0,"x":326.25000381469727,"y":520.0000066757202,"wires":[["73b00efa.cbcc8"]]},{"id":"49f82b55.241234","type":"function","z":"819bfe9c.ed4f","name":"5 рег","func":"msg.payload = msg.payload[0];\nreturn msg;","outputs":1,"noerr":0,"x":331.87500381469727,"y":250.00000381469727,"wires":[["43e5887d.2d3158","699b7f06.c475f"]]},{"id":"43e5887d.2d3158","type":"ui_text","z":"819bfe9c.ed4f","group":"aba36961.e78d08","order":0,"width":0,"height":0,"name":"","label":"5 регістр","format":"{{msg.payload}}","layout":"row-spread","x":723.7500114440918,"y":311.2500057220459,"wires":[]},{"id":"699b7f06.c475f","type":"ui_chart","z":"819bfe9c.ed4f","name":"","group":"f1f1a16b.d06f4","order":0,"width":0,"height":0,"label":"5 Регістр","chartType":"line","legend":"false","xformat":"HH:mm:ss","interpolate":"linear","nodata":"","ymin":"","ymax":"","removeOlder":1,"removeOlderPoints":"","removeOlderUnit":"60","cutout":0,"x":710.6250114440918,"y":351.2500066757202,"wires":[[],[]]},{"id":"dc57e594.61da18","type":"ui_chart","z":"819bfe9c.ed4f","name":"","group":"f1f1a16b.d06f4","order":0,"width":0,"height":0,"label":"Netto","chartType":"line","legend":"false","xformat":"HH:mm:ss","interpolate":"linear","nodata":"","ymin":"","ymax":"","removeOlder":1,"removeOlderPoints":"","removeOlderUnit":"60","cutout":0,"x":701.2500114440918,"y":675.0000114440918,"wires":[[],[]]},{"id":"35b0cf38.fc15a","type":"http in","z":"819bfe9c.ed4f","name":"","url":"/getAll","method":"get","swaggerDoc":"","x":186.875,"y":940.0000190734863,"wires":[["9b883885.e79788"]]},{"id":"52d1344b.58ea6c","type":"http in","z":"819bfe9c.ed4f","name":"","url":"/getTotal","method":"get","swaggerDoc":"","x":198.75,"y":1007.5000190734863,"wires":[["50fe93f0.fc01ec"]]},{"id":"c2cc0bd9.42a7f8","type":"debug","z":"819bfe9c.ed4f","name":"","active":false,"console":"true","complete":"payload","x":521.2500076293945,"y":151.25000286102295,"wires":[]},{"id":"b138992b.645ff8","type":"ui_text","z":"819bfe9c.ed4f","group":"aba36961.e78d08","order":0,"width":0,"height":0,"name":"","label":"Авто/ручний bit0","format":"{{msg.payload}}","layout":"row-spread","x":748.75,"y":271.25,"wires":[]},{"id":"85a8e103.35f6e","type":"function","z":"819bfe9c.ed4f","name":"","func":"msg.payload = msg.payload[0].value;\nreturn msg;","outputs":1,"noerr":0,"x":553.125,"y":261.25,"wires":[["b138992b.645ff8"]]},{"id":"55253719.85b5b8","type":"switch","z":"819bfe9c.ed4f","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"","vt":"num"},{"t":"eq","v":"2","vt":"str"}],"checkall":"true","outputs":2,"x":151.87500381469727,"y":310.00000381469727,"wires":[["2023758b.51fa2a"],["fd6807a1.bad7f8"]]},{"id":"e7de4688.5d99d8","type":"function","z":"819bfe9c.ed4f","name":"Fill weights table","func":"\nvar prev_total_netto = flow.get('prev_total_netto');\nvar cur_total_netto = flow.get('total_netto');\n\nif(prev_total_netto){\n    var record = {\n                Date: new Date(),\n                Weight: cur_total_netto-prev_total_netto,\n                TotalWeight:cur_total_netto\n            }     \n    flow.set('trigger',false);\n}\n\nflow.get('weights').push(record);  \nflow.set('prev_total_netto',cur_total_netto);\n\nmsg.payload = record;\n\nreturn msg;","outputs":1,"noerr":0,"x":485.62500762939453,"y":342.50000381469727,"wires":[["bfb88320.e0438"]]},{"id":"9b883885.e79788","type":"function","z":"819bfe9c.ed4f","name":"","func":"msg.payload = flow.get('weights');\nreturn msg;","outputs":1,"noerr":0,"x":418.12500762939453,"y":940.0000133514404,"wires":[["5f44aa8d.9b1974"]]},{"id":"5f44aa8d.9b1974","type":"http response","z":"819bfe9c.ed4f","name":"","x":568.125,"y":937.5,"wires":[]},{"id":"4749aa01.3937a4","type":"inject","z":"819bfe9c.ed4f","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":258.125,"y":41.25,"wires":[["4557b764.253c18"]]},{"id":"4557b764.253c18","type":"function","z":"819bfe9c.ed4f","name":"init","func":"flow.set('weights',[]);\nflow.set('trigger',false);\nreturn msg;","outputs":1,"noerr":0,"x":410.625,"y":40,"wires":[[]]},{"id":"fd6807a1.bad7f8","type":"function","z":"819bfe9c.ed4f","name":"","func":"flow.set('trigger',true);\nreturn msg;","outputs":1,"noerr":0,"x":311.875,"y":365,"wires":[[]]},{"id":"2023758b.51fa2a","type":"switch","z":"819bfe9c.ed4f","name":"","property":"trigger","propertyType":"flow","rules":[{"t":"true"}],"checkall":"true","outputs":1,"x":299.37500762939453,"y":306.25000381469727,"wires":[["e7de4688.5d99d8"]]},{"id":"517649ee.60d8a8","type":"modbus-read","z":"819bfe9c.ed4f","name":"20+7","showStatusActivities":true,"showErrors":false,"unitid":"1","dataType":"HoldingRegister","adr":"20","quantity":"7","rate":"2000","rateUnit":"ms","server":"c796563b.4b0948","x":98.75,"y":825,"wires":[["216ab5a.2c8f14a"],[]]},{"id":"216ab5a.2c8f14a","type":"debug","z":"819bfe9c.ed4f","name":"","active":false,"console":"true","complete":"payload","x":355,"y":796.2499990463257,"wires":[]},{"id":"c6b7b295.9c2c6","type":"ui_chart","z":"819bfe9c.ed4f","name":"","group":"f1f1a16b.d06f4","order":0,"width":0,"height":0,"label":"sum weight","chartType":"line","legend":"false","xformat":"HH:mm:ss","interpolate":"linear","nodata":"","ymin":"","ymax":"","removeOlder":1,"removeOlderPoints":"","removeOlderUnit":"60","cutout":0,"x":765,"y":523.75,"wires":[[],[]]},{"id":"50fe93f0.fc01ec","type":"function","z":"819bfe9c.ed4f","name":"","func":"msg.payload = flow.get('total_netto');\nreturn msg;","outputs":1,"noerr":0,"x":421.25,"y":1007.5,"wires":[["8b082cf0.01184"]]},{"id":"8b082cf0.01184","type":"http response","z":"819bfe9c.ed4f","name":"","x":571.2499923706055,"y":1004.9999866485596,"wires":[]},{"id":"bfb88320.e0438","type":"file","z":"819bfe9c.ed4f","name":"","filename":"/bulkweights","appendNewline":true,"createDir":true,"overwriteFile":"false","x":619.375,"y":417.5,"wires":[]}]
