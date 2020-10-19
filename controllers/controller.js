// require redis
const redis = require('redis');
const md5 = require('md5')
const async = require('async');

//connect to redis
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);


/*
Function to Create User
*/
exports.addUser = (req, res) => {
      const key = 'siswa';
      const { id } = req.body;
      const { nisn } = req.body;
      const { nama } = req.body;

      let old = []

      client.get(key, async(err, obj)=> {
          let data = await JSON.parse(obj);

          if (!data) {
            console.log('erroror')
          } else {
            old = data;
          }

          let newData = {
            'id': id,
            'nisn': nisn,
            'nama': nama
          }
          old.push(newData);

          //convert json to string
          const jsonTostr = JSON.stringify(old)

          client.set(key, jsonTostr, (err, reply) => {
            if (err) {
              console.log(err)
            }
            console.log(reply);
            res.send('add succes');
          })
      })
  };
  
  /*
  Function to get all Users
  */
  exports.getUsers = (req, res) => {
    key = 'siswa'

    client.get(key, async(err, obj) => {
        data = JSON.parse(obj);
        res.send(data);

        })
  };
  
  
  /*
  Functioon to get each User
  */
  exports.getUser = (req, res) => {
    const { id } = req.params;
    client.get('siswa', (err, obj) => {
        data = JSON.parse(obj)

        for (let i = 0; i < Object.keys(data).length; i++) {
          if (data[i].id == id) {
            res.send(data[i]);
          }
        }
    });
  };
  
  
  // Middleware to check user exists before update and Delete
  exports.checkUserExists = (req, res, next) => {
    const { id } = req.params;
    client.hgetall(id, (err, user) => {
      if (err) {
        return res.json({ status: 400, message: 'Something went wrong', err });
      }
      if (!user) {
        return res.json({ status: 400, message: 'Could not find that user' });
      }
      next();
    });
  };
  
  
  /*
  Function to Update User
  */
  exports.updateUser = (req, res) => {
    const key = 'siswa'
    let {param} =req.params;
    const { id } = req.body;
    const {nisn} = req.body;
    const {nama} = req.body;

    client.get(
      key, async(err, reply) => {
        let data= await JSON.parse(obj);
        
        for (let i = 0; i < Object.keys(data).length; i++) {
           if (data[i].id == param) {
             data[i].id = id
             data[i].nisn = nisn
             data[i].nama = nama
           }        
        }
                //convert json to string
                let jsonTostr = JSON.stringify(data)

                client.set(key, jsonTostr, (err, reply) => {
                    if (err) {
                      console.log(err)  
                    } else {
                        res.send('Update data success');
                    }
                })
      }
    );
  };
  
  
  /*
  Function to Delete Each User
  */
  exports.deleteUser = (req, res) => {
      let key = 'siswa';
      let {id} = req.params;

      client.get(key, async(err, obj) => {
        //convert string to json  
        let data = await JSON.parse(obj);

          for (let i = 0; i < Object.keys(data).length; i++) {
              if (data[i].id == id) {
                data.splice([i],1)
              }
          }
          //convert json to string
          let jsonTostr = JSON.stringify(data);

          client.set(key, jsonTostr, (err, reply) => {
            if (err) {
              console.log(err)
            } else {
              res.send('Delete Succes');
            }
          })
      })
  };  