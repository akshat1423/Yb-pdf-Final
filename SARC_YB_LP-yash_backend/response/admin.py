from django.contrib import admin
from response.models import userResponse

class userResponseAdmin(admin.ModelAdmin):
    list_display=['fullname', 'yearbookId', 'email', 'roll', 'phone', 'alternateMobileNo', 'ldap', 'department', 'degree', 'typeofcopy', 'address', 'ncopies', 'otherSelectedPeople'
                  , 'comments']

admin.site.register(userResponse, userResponseAdmin)
# Register your models here.
