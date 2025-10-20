export class GameSystem {

    constructor(ctx, bg_color = "#000000FF", FPS = 30) {
        this.ctx = ctx;
        this.bg = bg_color;
        this.fps = FPS;
        this.layers = {};
    }

    Register(system, layer = 0) {
        if (layer in this.layers) {
            this.layers[layer].push(system);
        } else {
            this.layers[layer] = [];
            this.layers[layer].push(system);
        }
    }
    UnRegister(system) {
        this.layers.forEach(layer => {
            const index = layer.indexOf(system);
            if (index > -1) {
                layer.splice(index, 1);
                return;
            }
        });
    }

    SetLayer(system, layerid) {
        this.layers.forEach(layer => {
            const index = layer.indexOf(system);
            if (index == layerid) return;
            if (index > -1) {
                layer.splice(index, 1);
                return;
            }
        });
        this.Register(system, layerid);
    }

    Start() {
        // start things here
        setInterval(() => this.GameLoop(), 1000 / this.fps);
    }

    GameLoop() {
        Object.values(this.layers).forEach(layer => {
            layer.forEach(system => {
                if (system.Update) system.Update();
                if (system.LateUpdate) system.LateUpdate();
                if (system.Draw) system.Draw(this.ctx);
            })
        });
    }

}