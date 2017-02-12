

# 'video' is the django model object,
# 's3_video_path' is where the original is stored on s3
def transcode_file(video, s3_video_path):
    input = {
        'Key': s3_video_path,
    }

    (video_path, extention) = os.path.splitext(s3_video_path)
    video_prefix = video_path.replace('video_uploads/', 'videos/')
    thumbnail_prefix = video_path.replace('video_uploads/', 'thumbnails/')

    outputs = [{
        'Key': '{0}_360.mp4'.format(video_prefix),
        'PresetId': PRESET_360,
        'ThumbnailPattern': '{0}_180_{{count}}'.format(thumbnail_prefix),
    }
    # ... more resolutions ...
    ]

    transcoder = Transcoder(PIPELINE_ID)
    transcoder.encode(input, outputs)
    transcoder.create_job_for_object(video)
