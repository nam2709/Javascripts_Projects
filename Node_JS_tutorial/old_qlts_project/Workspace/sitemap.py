# sitemaps.py
from django.contrib import sitemaps
from django.urls import reverse

from .models import AllAdminMenu


class StaticViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'daily'

    def items(self):
        #return ['accounts', 'about', 'contact']
        return AllAdminMenu.objects.filter(active=True)
    def location(self, item):
        return reverse(item)

