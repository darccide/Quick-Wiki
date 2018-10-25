const ApplicationPolicy = require("./application");

module.exports = class wikiPolicy extends ApplicationPolicy {

    new() {
        return this._isStandard() || this._isPremium() || this._isAdmin();
    }

    create() {
        return this.new();
    }

    edit() {
        return this._isAdmin() || this._isOwner() || this._isPublic();
    }

    update() {
        return this.edit();
    }

    destroy() {
        return this.update();
    }

    privatize() {
        return this._isPremium() || this._isAdmin();
    }

    publicize() {
        return this.privatize();
    }
}
