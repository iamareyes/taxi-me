"""
ASGI config for taxi project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from django.urls import path

from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taxi.settings')

django_asgi_app = get_asgi_application()

from taxi.middleware import TokenAuthMiddlewareStack
from trips.consumers import TaxiConsumer

application = ProtocolTypeRouter({
    'http': django_asgi_app,
    'websocket': TokenAuthMiddlewareStack(
        URLRouter([
            path('taxi/', TaxiConsumer.as_asgi()),
        ])
    ),
})
