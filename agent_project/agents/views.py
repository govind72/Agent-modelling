from django.http import JsonResponse
from .models import Agent

# Endpoint to fetch all agents or top-level agents
def get_all_agents(request):
    parentId = request.GET.get('parentId')
    if parentId == 'null':
        agents = Agent.objects.filter(parentId=None)
    else:
        agents = Agent.objects.all()

    data = [{'id': agent.id, 'parentId': agent.parentId, 'name': agent.name} for agent in agents]
    return JsonResponse(data, safe=False)

# Endpoint to get agent by ID
def get_agent_by_id(request, id):
    try:
        agent = Agent.objects.get(id=id)
        data = {'id': agent.id, 'parentId': agent.parentId, 'name': agent.name}
        return JsonResponse(data)
    except Agent.DoesNotExist:
        return JsonResponse({'message': 'Agent not found'}, status=404)

# Endpoint to update an agent by ID
def update_agent(request, id):
    try:
        agent = Agent.objects.get(id=id)
        # Extract and update agent data from the request
        # Update agent attributes
        agent.save()
        return JsonResponse({'message': 'Agent updated'})
    except Agent.DoesNotExist:
        return JsonResponse({'message': 'Agent not found'}, status=404)

# Endpoint to create a new agent
def create_agent(request):
    # Extract agent data from the request
    # Create a new Agent object
    # Save the new agent
    return JsonResponse({'message': 'Agent created'})
