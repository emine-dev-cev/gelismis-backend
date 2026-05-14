import oss2
import os
import uuid
from flask import current_app

class OSSService:
    @staticmethod
    def get_bucket():
        auth = oss2.Auth(
            current_app.config['OSS_ACCESS_KEY_ID'],
            current_app.config['OSS_ACCESS_KEY_SECRET']
        )
        return oss2.Bucket(
            auth,
            current_app.config['OSS_ENDPOINT'],
            current_app.config['OSS_BUCKET_NAME']
        )

    @staticmethod
    def upload_file(file_storage):
        """
        Uploads a file to Alibaba Cloud OSS and returns the public URL.
        """
        if not file_storage:
            return None

        bucket = OSSService.get_bucket()
        
        # Generate a unique filename
        ext = os.path.splitext(file_storage.filename)[1]
        filename = f"posts/{uuid.uuid4()}{ext}"
        
        # Upload
        bucket.put_object(filename, file_storage.read())
        
        # Generate public URL
        # Format: https://{bucket-name}.{endpoint}/{filename}
        endpoint = current_app.config['OSS_ENDPOINT']
        bucket_name = current_app.config['OSS_BUCKET_NAME']
        
        # Remove http:// or https:// from endpoint if present for URL construction
        clean_endpoint = endpoint.replace('http://', '').replace('https://', '')
        
        url = f"https://{bucket_name}.{clean_endpoint}/{filename}"
        return url
