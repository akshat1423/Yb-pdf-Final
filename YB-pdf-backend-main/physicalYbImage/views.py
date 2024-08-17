import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from PIL import Image, ImageChops
import requests
from io import BytesIO
import numpy as np
from concurrent.futures import ThreadPoolExecutor
from django.conf import settings
import os
from concurrent.futures import ThreadPoolExecutor
from django.http import JsonResponse
import requests 
from rest_framework import generics
from .models import idData
from .serializers import idDataSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

class idDataCreateView(generics.CreateAPIView):
    queryset = idData.objects.all()
    serializer_class = idDataSerializer

@api_view(['POST'])
def receive_data(request):
    received_data = request.data
    idData.objects.create(
        yearbookId=received_data.get('yearbookId'),
        otherSelectedPeople=received_data.get('otherSelectedPeople')
    )
    
    # Process the received data
    print("Received data:", received_data)
    
    return Response({'status': 'success', 'message': 'Data received successfully'})

@api_view(['GET'])
def get_existing_data(request):
    data = idData.objects.all()
    serializer = idDataSerializer(data, many=True)
    return Response(serializer.data)

# Function to download image
def download_image(url):
    response = requests.get(url)
    if response.status_code == 200:
        return Image.open(BytesIO(response.content))
    return None

# Function to compare images using Mean Squared Error (MSE)
def compare_images(image1, image2, similarity_threshold=99.0):
    if image1.size != image2.size:
        return False

    image1 = image1.convert('L')  # Convert to grayscale
    image2 = image2.convert('L')  # Convert to grayscale

    image1_np = np.array(image1)
    image2_np = np.array(image2)

    mse = np.square(image1_np - image2_np).mean()
    similarity_percentage = 100.0 - (mse / float(image1_np.size)) * 100.0
    return similarity_percentage >= similarity_threshold

# Function to resize image
def resize_image(image, max_size=100):
    if max(image.size) > max_size:
        aspect_ratio = float(image.size[0]) / float(image.size[1])
        new_width = max_size if aspect_ratio >= 1 else int(
            max_size * aspect_ratio)
        new_height = max_size if aspect_ratio <= 1 else int(
            max_size / aspect_ratio)
        image = image.resize((new_width, new_height), Image.LANCZOS)
    return image

# Main function to process posts
def process_post(post):
    print(post['id'])
    if not post['is_anonymous']:
        # comparisonImageUrl = "https://yearbook.sarc-iitb.org/api/Impression_Images/user_1128/profile.jpg"
        comparisonImageUrl = "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
        comparisonImage = resize_image(download_image(comparisonImageUrl))

        image_url = f'https://yearbook.sarc-iitb.org{post["written_by_profile"]["profile_image"]}'

        with ThreadPoolExecutor() as executor:
            future_image = executor.submit(download_image, image_url)

        image = resize_image(future_image.result())

        if compare_images(comparisonImage, image):
            post['written_by_profile']['profile_image'] = "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
        else:
            post['written_by_profile']['profile_image'] = f'https://yearbook.sarc-iitb.org{post["written_by_profile"]["profile_image"]}'

    return post

def process_profiles(profile):
    # comparisonImageUrlProfile = "https://yearbook.sarc-iitb.org/api/Impression_Images/user_1128/profile.jpg"
    comparisonImageUrlProfile = "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
    comparisonImageProfile = resize_image(download_image(comparisonImageUrlProfile))
    
    comparisonImageUrl = "https://yearbook.sarc-iitb.org/api/Impression_Images/user_6/img4.png"
    comparisonImage = resize_image(download_image(comparisonImageUrl))

    image_url1 = f'https://yearbook.sarc-iitb.org{profile["img1"]}'
    image_url2 = f'https://yearbook.sarc-iitb.org{profile["img2"]}'
    image_url3 = f'https://yearbook.sarc-iitb.org{profile["img3"]}'
    image_url4 = f'https://yearbook.sarc-iitb.org{profile["img4"]}'
    profile_url = f'https://yearbook.sarc-iitb.org{profile["profile_image"]}'

    with ThreadPoolExecutor() as executor:
        future_image1 = executor.submit(download_image, image_url1)
        future_image2 = executor.submit(download_image, image_url2)
        future_image3 = executor.submit(download_image, image_url3)
        future_image4 = executor.submit(download_image, image_url4)
        future_profile_img = executor.submit(download_image, profile_url)

    image = resize_image(future_image1.result())

    if compare_images(comparisonImage, image):
        profile['img1'] = "https://e0.pxfuel.com/wallpapers/363/464/desktop-wallpaper-iit-bombay.jpg"
    else:
        profile['img1'] = f'https://yearbook.sarc-iitb.org{profile["img1"]}'

    image = resize_image(future_image2.result())

    if compare_images(comparisonImage, image):
        profile['img2'] = "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202307/ezgif-sixteen_nine_649.jpg?size=948:533"
    else:
        profile['img2'] = f'https://yearbook.sarc-iitb.org{profile["img2"]}'

    image = resize_image(future_image3.result())

    if compare_images(comparisonImage, image):
        profile['img3'] = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/IITB_Large_hall_in_lecture_hall_complex.JPG/1920px-IITB_Large_hall_in_lecture_hall_complex.JPG"
    else:
        profile['img3'] = f'https://yearbook.sarc-iitb.org{profile["img3"]}'

    image = resize_image(future_image4.result())

    if compare_images(comparisonImage, image):
        profile['img4'] = "https://upload.wikimedia.org/wikipedia/commons/2/2e/IITBMainBuildingCROP.jpg"
    else:
        profile['img4'] = f'https://yearbook.sarc-iitb.org{profile["img4"]}'

    image = resize_image(future_profile_img.result())

    if compare_images(comparisonImageProfile, image):
        # profile['profile_image'] = "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
        profile['profile_image'] = "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
    else:
        profile['profile_image'] = f'https://yearbook.sarc-iitb.org{profile["profile_image"]}'

    return profile


@csrf_exempt
def feed(request):
    data = json.loads(request.body)
    posts = data.get("posts")

    if posts:
        new_posts = [process_post(post) for post in posts]

        json_response = json.dumps(new_posts)
        print(json_response)
        return HttpResponse(json_response, content_type="application/json")

    return HttpResponse("No posts provided.", status=400)


@csrf_exempt
def profile(request):
    data = json.loads(request.body)
    profiles = data.get("profiles")

    if profiles:
        new_profiles = [process_profiles(profile) for profile in profiles]

        json_response = json.dumps(new_profiles)
        print(json_response)
        return HttpResponse(json_response, content_type="application/json")

    return HttpResponse("No posts provided.", status=400)
