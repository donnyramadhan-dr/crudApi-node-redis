'use strict'

const { json } = require('body-parser');

module.exports = function(app) {
    const jsonku = require('../controllers/controller');

    app.route('/siswa/add')
        .post(jsonku.addUser);

    app.route('/siswa')
        .get(jsonku.getUsers);  
        
    app.route('/siswa/:id')
        .get(jsonku.getUser);
        
    app.route('/siswa/update/:param')    
        .put(jsonku.updateUser);

    app.route('/siswa/delete/:id')
        .delete(jsonku.deleteUser);    
}