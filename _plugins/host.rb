module Jekyll
  module HostFilter
    def host_with_sub(url)
      url.to_s.gsub(/^(?:(?:https?|ftp):\/\/)?(.*?)(?:\/.*|$)/, '\1')
    end

    def host(url)
      url.to_s.gsub(/^(?:(?:https?|ftp):\/\/)?(?:www.)?(.*?)(?:\/.*|$)/, '\1')
    end
  end
end

Liquid::Template.register_filter(Jekyll::HostFilter)
