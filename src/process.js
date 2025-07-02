const html = await loadHtml("body.html");
const { join } = util;

class proc extends ThirdPartyAppProcess {
	wallpapers = {}; // Record<path, direct>;

	constructor(handler, pid, parentPid, app, workingDirectory, ...args) {
		super(handler, pid, parentPid, app, workingDirectory);
	}

	async render() {
		const body = this.getBody();
		body.innerHTML = html;

		const wallpapersPath = join(workingDirectory, "Wallpapers");
		const thumbnailsPath = join(workingDirectory, "Thumbnails");
		const dir = await this.fs.readDir(wallpapersPath);

		for (const file of dir.files.filter((f) => f.name.endsWith(".jpg"))) {
			const thumbnail = join(thumbnailsPath, file.name);
			const path = join(wallpapersPath, file.name);

			this.wallpapers[path] ||= this.wallpapers[path] = await this.fs.direct(thumbnail);

			const img = document.createElement("img");
			const id = `@local:${btoa(path)}`;
			const name = file.name.split(".")[0];
			const wallpaper = {
				author: "Microsoft Corporation",
				name,
       				url: "",
        			thumb: "",
      			}

			img.src = this.wallpapers[path];
			img.className = `wallpaper-option ${name}`;
			img.addEventListener("click", () => {
				this.userPreferences.update((v) => {
					v.userWallpapers ||= {};
					v.userWallpapers[id] = wallpaper;
					v.desktop.wallpaper = id;

					return v;
				});
			});

			this.userPreferences.subscribe((v) => {
				img.classList.toggle("selected", v.desktop.wallpaper === id);
			});

			body.append(img);
		}
	}
}

return { proc };