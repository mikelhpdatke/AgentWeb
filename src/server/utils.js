var utils = {

    storeMD5: function(data) {
        return data
    },

    storeSyscall: function(data) {
        return data
    },

    storePcap: function(data) {
        data = data.split('\n');
        return data[0];
    },

    storeData: function(task, data) {
        var response = null;
        if (task == "1") {
            response = this.storeMD5(data);
        }
        else {
            if (task == "2") {
                response = this.storePcap(data);
            }
            else {
                if (task == "3") {
                    response = this.storeSyscall(data);
                }
            }
        }
        return response;
    },

    addClient: function(L, c) {
        for (var i = 0; i < L; i++) {
            if (L[i]['ip'] == c['ip']) {
                L[i] = c;
                return L;
            }
        }
        L.push(c);
        return L;
    },


}

module.exports = utils;