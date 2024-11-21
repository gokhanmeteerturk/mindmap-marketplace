from rest_framework import serializers
from .models import MindMap
from django.contrib.auth import authenticate
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user and user.is_active:
            return {'user': user}
        raise serializers.ValidationError("Incorrect credentials")

class MindMapSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)  # Default to username

    class Meta:
        model = MindMap
        fields = ['id', 'name', 'description', 'added_date', 'author', 'nodes', 'edges', 'price_gbp']  # Include `id` field
        read_only_fields = ['id', 'author', 'added_date']

    def to_representation(self, instance):
        """
        Customizes the serialized output.
        """
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if request and request.parser_context['view'].action != 'list':
            representation['author'] = instance.author.id
        return representation

    def create(self, validated_data):
        request = self.context.get('request')
        if not request or not request.user:
            raise serializers.ValidationError("Request user is required to set the author.")
        validated_data['author'] = request.user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.nodes = validated_data.get('nodes', instance.nodes)
        instance.edges = validated_data.get('edges', instance.edges)
        instance.edges = validated_data.get('price_gbp', instance.edges)
        instance.save()
        return instance