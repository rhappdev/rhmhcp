# Welcome to RedHat Mobile Hot Code Push (rhmhcp)

RedHat Mobile Hot Code Push is a comprehensive solution that allows pushing bug fixes / new features to installed native or hybrid mobile application. It provides universal web interfaces where developers could manage / publish builds which was uploaded through rhmhcp cli tool. The solutions also contains several SDKs for different platforms.

Core components are:

* server: A node.js based backend which exposes HCP related Restful APIs
* sdk: Multi-platform sdk to enable HCP on mobile apps
* Portal: Admin portal to allow some management work
* CLI: A node.js based command line tool for easy use

![https://drive.google.com/uc?export=download&id=0ByuKQDQ-pFtieFZBdFNYLUJHMTQ](https://drive.google.com/uc?export=download&id=0ByuKQDQ-pFtieFZBdFNYLUJHMTQ)


# Development Setup

## CLI

Use `npm link` to make it globally available, e.g:

```
# prevent conflicts by uninstalling global version
npm uninstall -g rhmhcp-cli

# Clone locally and cd into cli directory
git clone $THIS_PROJECT_URL rhmcp
cd rhmcp
cd cli

# Install dependencies and make globally available
npm install
npm link
```

Now you can use the development CLI like so:

```
rhcp init http://localhost:9090
```


# Contribution

