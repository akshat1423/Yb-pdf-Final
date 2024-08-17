from django.db import models

class userResponse(models.Model):
    fullname=models.CharField(max_length=50)
    yearbookId=models.CharField(default="", max_length=10)
    email=models.EmailField()
    roll=models.CharField(max_length=10)
    phone=models.CharField(max_length=12)
    alternateMobileNo=models.CharField(max_length=12, default="", blank=True)
    ldap=models.EmailField()
    department=models.CharField(max_length=50)
    degree=models.CharField(max_length=50)
    typeofcopy=models.CharField(max_length=150)
    address=models.TextField(default="")
    ncopies=models.CharField(max_length=150)
    otherSelectedPeople=models.JSONField(default=list, blank=True)
    comments=models.TextField(blank=True)