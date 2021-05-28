from django.db import models

class TimeStampedModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)  # When it was create
    updated_on = models.DateTimeField(auto_now=True)  # When i was update

    class Meta:
        abstract = True

class Categories(TimeStampedModel):
	"""docstring for Categories"""
	def __init__(self, arg):
		super(Categories, self).__init__()
		self.arg = arg

class SubCategories(TimeStampedModel):
	"""docstring for Categories"""
	def __init__(self, arg):
		super(Categories, self).__init__()
		self.arg = arg

class DeliveryAddress(TimeStampedModel):
	"""docstring for Categories"""
	def __init__(self, arg):
		super(Categories, self).__init__()
		self.arg = arg

class PickupAddress(TimeStampedModel):
	"""docstring for Categories"""
	def __init__(self, arg):
		super(Categories, self).__init__()
		self.arg = arg

