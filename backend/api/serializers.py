from rest_framework import serializers
from .models import MindMap

class MindMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = MindMap
        fields = ['name', 'description', 'author']
        read_only_fields = ['author']


    def create(self, validated_data):
        request = self.context.get('request')
        if not request or not request.user:
            raise serializers.ValidationError("Request user is required to set the author.")
        validated_data['author'] = request.user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance