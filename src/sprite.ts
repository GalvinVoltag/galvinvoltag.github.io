export class GameSystem {

    keys: Record<string, boolean> = {};

    ctx:CanvasRenderingContext2D;
    bg_color:string;
    fps:number;
    layers:Record<number, any[]>;
    timeScales:Record<number, number>;
    lastUpdate:number;
    cameraPos:V2;
    areas:Record<string, Area>;
    currentArea:Area;
    gameElement:HTMLElement;
    enabled:boolean;

    constructor(gameElement: HTMLElement, ctx: CanvasRenderingContext2D, bg_color:string = "#000000FF", FPS:number = 30, defaultArea:Area = new Area()) {
        this.ctx = ctx;
        this.bg_color = bg_color;
        this.fps = FPS;
        this.layers = {};
        this.timeScales = {0: 1};
        this.lastUpdate = Date.now();
        this.cameraPos = new V2();
        this.areas = {"def": defaultArea};
        this.currentArea = this.areas["def"];
        this.gameElement = gameElement;
        this.enabled = true;
    }

    GameLoop(): void {
        if (!this.enabled) return;
        var now = Date.now();
        var deltaTime = (now - this.lastUpdate) / 100;
        this.lastUpdate = now;
        this.ctx.rect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
        this.ctx.fillStyle = this.bg_color;
        this.ctx.fill();
        this.cameraPos = this.currentArea.limit(this.cameraPos);
        this.ctx.setTransform(1,0,0,1, Math.round((this.ctx.canvas.clientWidth/5) - this.cameraPos.x), Math.round(this.ctx.canvas.clientHeight/5 - this.cameraPos.y));
        let usedids:any = [];
        Object.keys(this.layers).concat(Object.keys(this.currentArea.layers)).forEach((ids) => {
            let id:number = +ids;
            if (usedids.includes(id)) 
                return;
            let arr = [];
            if (this.layers[id] != null && this.currentArea.layers[id] != null)
                arr = this.layers[id].concat(this.currentArea.layers[id]);
            else if (this.currentArea.layers[id] == null)
                arr = this.layers[id];
            else
                arr = this.currentArea.layers[id];

            arr.forEach(system => {
                let ts = this.timeScales[0];
                if (Object.hasOwn(this.timeScales, id)) ts = this.timeScales[id];
                if (system.Update) system.Update(deltaTime*ts);
                if (system.LateUpdate) system.LateUpdate(deltaTime*ts);
                if (system.Draw) system.Draw(this.ctx, deltaTime*ts);
            })
            usedids.push(id);
        });
    }

    SetTimeScale(layerID:number, newTimeScale:number): void {
        this.timeScales[layerID] = newTimeScale;
    }
    ClearTimeScale(layerID:number): void {
        if (layerID == 0) this.timeScales[0] = 1;
        else if (Object.hasOwn(this.timeScales, layerID)) delete this.timeScales[layerID];
    }

    AddArea(areaName:string, newArea = new Area()): void {
        this.areas[areaName] = newArea;
    }

    SetArea(areaName:string): void {
        if (areaName in this.areas) {
            this.currentArea = this.areas[areaName];
        }
    }

    Register(system:any, layer = 0): void {
        if (layer in this.layers) {
            this.layers[layer].push(system);
        } else {
            this.layers[layer] = [];
            this.layers[layer].push(system);
        }
    }
    UnRegister(system:any): boolean {
        for (const layer of Object.values(this.layers)) {
            const index = layer.indexOf(system);
            if (index > -1) {
                layer.splice(index, 1);
                return true;
            }
        } return false;
        // this.layers.forEach(layer => {
        //     const index = layer.indexOf(system);
        //     if (index > -1) {
        //         layer.splice(index, 1);
        //         return true;
        //     }
        // }); return false;
    }
    SetLayer(system:any, layerid:number): boolean {
        if (this.UnRegister(system)){
            this.Register(system, layerid);
            return true;
        } return false;
    }

    Start(): void {
        document.addEventListener('keydown', (e) => {
            if (document.activeElement == document.getElementById(this.gameElement.id)) {
                e.preventDefault();
                this.keys[e.key] = true;
            }
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
        // start things here
        setInterval(() => this.GameLoop(), 1000 / this.fps);
    }

    KeyDown(keyID: string): boolean {
        return this.keys[keyID];
    }

}


export class Area {
    Rect:R;
    Origin:V2;
    layers:Record<number, any[]>;

    constructor(Rect = new R(), Origin = new V2()) {
        this.Rect = Rect;
        this.Origin = Origin;
        this.layers = {};
    }

    limit(position:V2) {
        var np = new V2(position.x, position.y);
        let rct = this.Rect.GetRectOrigin(this.Origin)
        if (position.x > rct.Right )
            np.x = rct.Right;
        else if (position.x < rct.Left )
            np.x = rct.Left;
        if (position.y > rct.Bottom )
            np.y = rct.Bottom;
        else if (position.y < rct.Top )
            np.y = rct.Top;
        return np;
    }

    Register(system:any, layer = 0) {
        if (layer in this.layers) {
            this.layers[layer].push(system);
        } else {
            this.layers[layer] = [];
            this.layers[layer].push(system);
        }
    }
    UnRegister(system:any) {
        for (const layer of Object.values(this.layers)) {
            const index = layer.indexOf(system);
            if (index > -1) {
                layer.splice(index, 1);
                return true;
            }
        } return false;
        // this.layers.forEach(layer => {
        //     const index = layer.indexOf(system);
        //     if (index > -1) {
        //         layer.splice(index, 1);
        //         return true;
        //     }
        // }); return false;
    }
    SetLayer(system:any, layerid:number) {
        if (this.UnRegister(system)){
            this.Register(system, layerid);
            return true;
        } return false;
    }
}




















//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
export class TileMap {
    sprite:Sprite;
    tiles:number[][];
    position:V2;

    constructor(sprite:Sprite, position = new V2(), tiles = []) {
        this.sprite = sprite;
        this.tiles = tiles;
        this.position = position;
    }

    Draw(ctx:CanvasRenderingContext2D, deltaTime:number) {
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                this.sprite.frame = this.tiles[y][x];
                this.sprite.DrawAt(ctx, deltaTime, new V2(this.position.x + x*this.sprite.frameSize.x, this.position.y + y*this.sprite.frameSize.y));
            }
        }
    }
}

export class Player {
    game:GameSystem;
    sprite:Sprite;
    position:V2;
    speed:number;
    controls:Record<string, string>;

    constructor(game:GameSystem, sprite:Sprite, speed = 4, controls = {"up": "ArrowUp", "down": "ArrowDown", "right": "ArrowRight", "left": "ArrowLeft", "interact": "Z", "cancel": "X", "menu": "C"}) {
        this.sprite = sprite;
        this.position = sprite.position;
        this.speed = speed;
        this.controls = controls;
        this.game = game;
    }

    GetAxis(x:boolean, y:boolean):number {
        if (x&&y) { return 0;
        } else if (y) { return -1;
        } else if (x) { return 1;
        } else { return 0;
        }
    }

    Update(deltaTime:number) {
        let xax = this.GetAxis(this.game.KeyDown("ArrowRight"), this.game.KeyDown("ArrowLeft"))*deltaTime*this.speed;
        let yax = this.GetAxis(this.game.KeyDown("ArrowDown"), this.game.KeyDown("ArrowUp"))*deltaTime*this.speed;
        this.position.x += xax;
        this.position.y += yax;
        this.game.cameraPos = this.position;
        if (yax < 0)
            this.sprite.setanimation("walk_up");
        else if (yax > 0)
            this.sprite.setanimation("walk_down");
        else if (xax < 0)
            this.sprite.setanimation("walk_left");
        else if (xax > 0)
            this.sprite.setanimation("walk_right");
        else
            this.sprite.clearanimation();
    }

    Draw(ctx:CanvasRenderingContext2D, deltaTime:number) {
        this.sprite.position = this.position;
        this.sprite.DrawAt(ctx, deltaTime, this.position);
    }
}


export interface SpriteConfig {
    resource:any;
    frameSize:V2;
    frames:Record<number, V2>;
    frame:number;
    scale:V2;
    position:V2;
    origin:V2;
    animations:any;
    currentAnimation:any;
    animationTime:number;
}
export class Sprite {
    resource:any;
    frameSize:V2;
    frames:Record<number, V2>;
    frame:number;
    scale:V2;
    position:V2;
    origin:V2;
    animations:Record<string, AnimationFrames>;
    currentAnimation:any;
    animationTime:number;

    constructor({
        resource,
        frameSize,
        frames,
        frame,
        scale,
        position,
        origin,
        currentAnimation,
        animations,
    }: SpriteConfig) {
        this.resource = resource;
        this.frameSize = frameSize ?? new V2(this.resource.image.width, this.resource.image.height);
        this.frames = frames ?? {0:new V2()};
        this.frame = frame ?? 0;
        this.scale = scale ?? new V2(1, 1);
        this.position = position ?? new V2();
        this.origin = new V2(0.5, 0.5);
        this.animations = animations ?? {};
        this.currentAnimation = currentAnimation ?? null;
        this.animationTime = 0;
    }

    setanimation(id:string, resetTime = false) {
        if (Object.hasOwn(this.animations, id))
            this.currentAnimation = id;
        if (resetTime)
            this.animationTime = 0;
    }
    clearanimation(resetTime = false) {
        this.currentAnimation = null;
        if (resetTime)
            this.animationTime = 0;
    }

    DrawAt(ctx:CanvasRenderingContext2D, deltaTime=0, targetPos:V2) {
        if (!this.resource.isLoaded)
            return;
        if (this.currentAnimation != null) {
            if (Math.floor(this.animationTime*this.animations[this.currentAnimation].speed) >= this.animations[this.currentAnimation].frames.length)
                this.animationTime=0;
            this.frame = this.animations[this.currentAnimation].frames[Math.floor(this.animationTime*this.animations[this.currentAnimation].speed)];
            this.animationTime+=deltaTime;
        }
        ctx.drawImage(
            this.resource.image,
            this.frames[this.frame].x,
            this.frames[this.frame].y,
            this.frameSize.x,
            this.frameSize.y,
            Math.round(targetPos.x - this.origin.x*this.frameSize.x),
            Math.round(targetPos.y - this.origin.y*this.frameSize.y),
            this.scale.x*this.frameSize.x,
            this.scale.y*this.frameSize.y
        );
    }

    Draw(ctx:CanvasRenderingContext2D, deltaTime=0) {
        if (!this.resource.isLoaded)
            return;
        if (this.currentAnimation != null) {
            if (Math.floor(this.animationTime*this.animations[this.currentAnimation].speed) >= Object.keys(this.animations[this.currentAnimation].frames).length)
                this.animationTime=0;
            this.frame = this.animations[this.currentAnimation].frames[Math.floor(this.animationTime*this.animations[this.currentAnimation].speed)];
            this.animationTime+=deltaTime;
        }
        ctx.drawImage(
            this.resource.image,
            this.frames[this.frame].x,
            this.frames[this.frame].y,
            this.frameSize.x,
            this.frameSize.y,
            Math.round(this.position.x - this.origin.x*this.frameSize.x),
            Math.round(this.position.y - this.origin.y*this.frameSize.y),
            this.scale.x*this.frameSize.x,
            this.scale.y*this.frameSize.y
        );
    }
}









export class V2 {
    x:number;
    y:number;

    constructor(x=0, y=0) {
        this.x = x ?? 0,
        this.y = y ?? 0
    }

    Add(A:V2) {
        if (A instanceof V2)
            return new V2(this.x+A.x, this.y+A.y);
        else
            return new V2(this.x+A, this.y+A);
    }

    Mul(A:V2) {
        if (A instanceof V2)
            return new V2(this.x*A.x, this.y*A.y);
        else
            return new V2(this.x*A, this.y*A);
    }

    Div(A:V2) {
        if (A instanceof V2)
            return new V2(this.x/A.x, this.y/A.y);
        else
            return new V2(this.x/A, this.y/A);
    }

    Neg() {
        return new V2(-this.x, -this.y);
    }
}

export class R {
    A:V2;
    B:V2;
    constructor(Left = 0, Right = 0, Bottom = 0, Top = 0) {
        this.A = new V2(Left, Top);
        this.B = new V2(Right, Bottom);
    }

    GetRect(){
        return {
            Left: this.A.x,
            Right: this.B.x,
            Top: this.A.y,
            Bottom: this.B.y
        };
    }

    GetRectOrigin(O:V2) {
        return {
            Left: O.x+this.A.x,
            Right: O.x+this.B.x,
            Top: O.y+this.A.y,
            Bottom: O.y+this.B.y
        };
    }
}

export class AnimationFrames {
    frames:number[];
    speed:number;
    constructor(frames= [], speed=1) {
        this.frames = frames,
        this.speed = speed
    }
}