from django.db import models

class Agent(models.Model):
    id = models.IntegerField(primary_key=True)
    parentId = models.IntegerField(null=True)
    name = models.CharField(max_length=100)
    subAgents = models.ManyToManyField("self", symmetrical=False, blank=True)

    # Other attributes for the agent

    def __str__(self):
        return self.name
