class Resource {
  constructor() {
    this.toLoad = {
      ph: "./public/images/placeholder_spritesheet.png",
      tennasheet: "./public/images/TennaFullMap.png",
      playersheet: "./public/images/combined_spritesheet.png"
    }

    this.images = {};

    Object.keys(this.toLoad).forEach(key => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false
      }
      img.onload = () => {
        this.images[key].isLoaded = true;
      }
    })
  }
}
export const resources = new Resource();