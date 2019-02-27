core.registerOperator("subframe", function (operator) {
    let me = this;
    this.settings = {};

    this.rootdiv = document.createElement("div");
    //Add div HTML here
    this.rootdiv.innerHTML = ``;
    this.rootdiv.style.cssText=`width:100%; height: 100%; position:relative`;
    operator.div.appendChild(this.rootdiv);
    this.rect=new _rect(core,this.rootdiv,RECT_ORIENTATION_X,1,0);
    //////////////////Handle core item updates//////////////////

    this.resize=function(){
        this.rect.resize();
    }
    //For interoperability between views you may fire() and on() your own events. You may only pass one object to the fire() function; use the properties of that object for additional detail.
    this.processSettings=function(){
    }

    //////////////////Handling local changes to push to core//////////////////

    //Saving and loading
    this.toSaveData = function () {
        this.settings.rectUnderData=this.rect.toSaveData();
        return this.settings;
    }

    this.fromSaveData = function (d) {
        Object.assign(this.settings, d);
        this.rect.fromSaveData(this.settings.rectUnderData);
        this.rect.resize();
        this.processSettings();
    }

    //Create a settings dialog
    scriptassert([
        ["dialog", "genui/dialog.js"]
    ], () => {
        me.dialog = document.createElement("div");

        me.dialog.innerHTML = `
        <div class="dialog">
        </div>`;
        dialogManager.checkDialogs(me.dialog);
        //Restyle dialog to be a bit smaller
        me.dialog = me.dialog.querySelector(".dialog");
        me.innerDialog = me.dialog.querySelector(".innerDialog");
        operator.div.appendChild(me.dialog);
        let d = document.createElement("div");
        d.innerHTML = `
        WHAT YOU WANT TO PUT IN YOUR DIALOG
        `;
        me.innerDialog.appendChild(d);

        //When the dialog is closed, update the settings.
        me.dialog.querySelector(".cb").addEventListener("click", function () {
            me.updateSettings();
        })

        me.showSettings = function () {
            me.dialog.style.display = "block";
        }
    })



});