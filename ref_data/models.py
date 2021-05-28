from django.db import models

class TimeStampedModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)  # When it was create
    updated_on = models.DateTimeField(auto_now=True)  # When i was update

    class Meta:
        abstract = True
# Create your models here.
class DeliveryArea(TimeStampedModel):
	"""docstring for ClassName"TimeStampedModel
	def __init__(self, arg):
		super(ClassName,TimeStampedModel).__init__()
		self.arg = arg
		