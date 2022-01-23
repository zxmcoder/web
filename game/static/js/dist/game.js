
class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-field">
        <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">
            单人模式 
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-multi-mode">
            多人模式 
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings">
            设置 
        </div>
    </div>
</div>
        `);
        this.root.$ac_game.append(this.$menu);
        this.$single_mode = this.$menu.find(".ac-game-menu-field-item-single-mode");
        this.$multi_mode = this.$menu.find(".ac-game-menu-field-item-multi-mode");
        this.$settings = this.$menu.find(".ac-game-menu-field-item-settings");
        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;

        this.$single_mode.click(function() {
            outer.hide();
            outer.root.playground.show();
        });

        this.$multi_mode.click(function() {
            console.log("click multi mode");
        });

        this.$settings.click(function() {
            console.log("click settings");
        });
    }

    show() {
        this.$menu.show();
    }

    hide() {
        this.$menu.hide();
    }
}// 实现一个极为简单的物理引擎

let AC_GAME_OBJECTS = []

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);

        this.has_called_start = false;
        this.timedelta = 0; //距离上一个图片的时间间隔

    }

    start() {

    }

    update() {

    }

    on_destory() {

    }

    destory() {
        this.on_destory();

        for(let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
            if(AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
 }

let last_timestamp;
let AC_GAME_ANIMATION = function(timestamp) {
    for(let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
        let obj = AC_GAME_OBJECTS[i];
        if(!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        }
        else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    
    requestAnimationFrame(AC_GAME_ANIMATION);
}

requestAnimationFrame(AC_GAME_ANIMATION);
class GameMap extends AcGameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);
    }

    start() {

    }

    update() {
        this.render();
    }

    render() {
        this.ctx.fillStyle = "rgba(0,0,0,0.2)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div>游戏界面</div>`);

        this.hide();
        this.root.$ac_game.append(this.$playground);

        this.start();
    }

    start() {

    }

    show() {
        this.$playground.show();
    }

    hide() {
        this.$playground.hide();
    }
}
class AcGame {
    constructor(id) {
        this.id = id;
        this.$ac_game = $('#' + id);
        this.menu = new AcGameMenu(this);
        this.playground = new AcGamePlayground(this);

        this.start();
    }

    start() {
        
    }
}