var utils = {

    storeMD5: function(data) {
        return data
    },

    storeSyscall: function(data) {
        return data
    },

    storePcap: function(data) {
        //console.log(data);
        var resultForPcap = data.toString().split('0x0000');
        return resultForPcap[0];
    },

    storeData: function(task, data) {
        var response = null;
        if (task.toString() == "1") {
            response = this.storeMD5(data);
        }
        else {
            if (task.toString() == "2") {
                response = this.storePcap(data);
            }
            else {
                if (task.toString() == "3") {
                    response = this.storeSyscall(data);
                }
            }
        }
        return response;
    },

    addClient: function(L, c) {
        for (var i = 0; i < L.length; i++) {
            tmp = L[i]
            if (tmp['ip'] == c['ip']) {
                L.splice(i, 1);
                break;
            }
        }
        L.push(c);
        return L;
    },

    getTask: function(L, sName) {
        for (var i = 0; i < L.length; i++) {
            if (L[i]['address'] == sName) {
                return L[i]['currentTask'];
            }
        }
        return null;
    }
}

module.exports = utils;