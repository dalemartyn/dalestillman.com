module Jekyll
  module RevFilter
    def rev(asset)
      require 'json'

      manifest_path = './css-manifest.json'

      file = File.read(manifest_path)

      manifest = JSON.parse(file)

      manifest[asset]
    end
  end
end

Liquid::Template.register_filter(Jekyll::RevFilter)
