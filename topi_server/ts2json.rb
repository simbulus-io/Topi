#!/usr/bin/env ruby
def install_missing(&block)
  yield
rescue LoadError => e
  gem_name = e.message.split('--').last.strip
  install_command = 'gem install ' + gem_name

  # install missing gem
  puts 'Probably missing gem: ' + gem_name
  print 'Auto installing'
  system(install_command) or exit(1)

  # retry
  Gem.clear_paths
  puts 'Trying again ...'
  require gem_name
  retry
end

install_missing do
  require "thor"
  require "json"
  require "colorize"
  require "os"
  require 'colorize'
end

require 'fileutils'

class BuildSchema < Thor

  ROOTDIR = File.expand_path(File.join('../', File.dirname(__FILE__)))
  class_option :quiet, :aliases=>"q",  :type=>:boolean, :desc => "less chatty", :default=>false
  class_option :dry_run, :aliases=>"d",   :type=>:boolean, :desc => "just print the commands", :default=>false
  method_option :srcs , :alias=>"s", :required=>true, :type=>:string, :desc => "src glob"
  method_option :outdir , :alias=>"t", :default=>'.', :type=>:string, :desc => "output directory"
  desc "generate", "generate json schema from typscript"
  def generate
    dry_run, quiet, srcs, outdir = options.values_at(:dry_run, :quiet, :srcs, :outdir)
    srcdir = File.expand_path(File.dirname(srcs))
    abort("Can\'t stat srcdir: #{srcdir}") unless Dir.exists?(srcdir)
    outdir = File.expand_path(outdir)
    abort("Can\'t stat outdir: #{outdir}") unless Dir.exists?(outdir)

    # do yarn install if necessary
    ver_cmd = "npx ts-json-schema-generator --version"
    unless run_cmd(ver_cmd)
      Dir.chdir(ROOTDIR) {
        info("installing ts-json-schema-generator")
        system("yarn install")
        abort("yarn install of required deps failed") unless run_cmd(ver_cmd)
      }
    end

    warn("no files matching glob #{srcs}")if Dir.glob(srcs).count
    Dir.glob(srcs) do |src|
      cmd = "npx ts-json-schema-generator --path #{src} -o #{outdir}/#{File.basename(src, '.ts')}.json -e export"
      run_cmd(cmd)
    end

  end

  default_task :generate
  private

  def command_runner cmd:, repo:nil, branch:nil
    status = run_cmd(cmd)
    status
  end

  # echo and run ToDo: error handling
  def run_cmd cmd
    info cmd unless options[:quiet]
    return if options[:dry_run]
    status = system(cmd)
    unless status
      error("Bad status from #{cmd}")
    end
    status
  end

  def error msg
    puts msg.to_s.colorize(:red)
    exit(1);
  end

  # for depreciation warning
  def self.exit_on_failure?
    true
  end

  def info msg
    puts msg.to_s.colorize(:yellow)
  end

end

BuildSchema.start




