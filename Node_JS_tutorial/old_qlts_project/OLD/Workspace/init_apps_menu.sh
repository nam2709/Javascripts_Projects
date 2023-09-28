#!/usr/bin/env bash

python manage.py shell

from Website.models import *
#####
app=AllApp.objects.create(name="Dashboard", is_product=True)
menu_group=AdminMenuGroup.objects.create(name="Dashboard", app=app, order=0)

menu = AllAdminMenu.objects.create(name="MainMenu >> Dashboard", menu_group=menu_group)

#####


# Clear TESTING
AdminMenuGroup.objects.filter(name="TEST").delete()
AllApp.objects.filter(name="TEST").delete()
AllAdminMenu.objects.filter(name="MainMenu >> TEST").delete()

#####
from Website.models import *

app=AllApp()
app.name="TEST"
app.is_product=True
app.save()
####
menu_group=AdminMenuGroup()
menu_group.name="TEST"
menu_group.app=app
menu_group.order=0
menu_group.save()
####
menu=AllAdminMenu()
menu.name="MainMenu >> TEST"
menu.url="#"
menu.menu_group=menu_group
menu.save()
#####
####
sub_menu1=AllAdminMenu()
sub_menu1.name="Child >> TEST1"
sub_menu1.url="#"
sub_menu1.parent_menu=menu
sub_menu1.save()

sub_menu2=AllAdminMenu()
sub_menu2.name="Child >> TEST2"
sub_menu2.url="#"
sub_menu2.parent_menu=menu
sub_menu2.save()
#####

##################################################
##################### ALERT ######################
##################################################
from Website.models import *
app=AllApp()
app.name="Alert"
app.url="/alerts/"
app.is_product=True
app.save()
####
menu_group=AdminMenuGroup()
menu_group.name="Alert"
menu_group.app=app
menu_group.order=90
menu_group.save()
####
menu=AllAdminMenu()
menu.name="MainMenu >> Alert"
menu.title="Alert"
menu.url="/alerts/"
menu.menu_group=menu_group
menu.save()
##################################################

##################################################
##################### LOGGER ######################
##################################################
from Website.models import *
app=AllApp()
app.name="Logger"
app.url="/logs/"
app.is_product=True
app.save()
####
menu_group=AdminMenuGroup()
menu_group.name="Logging"
menu_group.app=app
menu_group.order=100
menu_group.save()
####
menu=AllAdminMenu()
menu.name="MainMenu >> Logger"
menu.title="Logger"
menu.url="#"
# menu.url="/logs/"
menu.menu_group=menu_group
menu.save()

#######
sub_menu1=AllAdminMenu()
sub_menu1.name="Logger >> Summary"
sub_menu1.title="Summary"
sub_menu1.url="/logs/"
sub_menu1.parent_menu=menu
sub_menu1.save()

sub_menu2=AllAdminMenu()
sub_menu2.name="Logger >> AllLog"
sub_menu2.title="All Log"
sub_menu2.url="/logs/all-log/"
sub_menu2.parent_menu=menu
sub_menu2.save()
#####
##################################################

##################################################
##################### Account ######################
##################################################
from Website.models import *
app=AllApp()
app.name="Account"
app.url="/account/"
app.is_product=True
app.save()
####
menu_group=AdminMenuGroup()
menu_group.name="Account"
menu_group.app=app
menu_group.order=80
menu_group.save()
####
menu=AllAdminMenu()
menu.name="MainMenu >> Account"
menu.title="Account"
menu.url="#"
# menu.url="/logs/"
menu.menu_group=menu_group
menu.save()

#######
sub_menu1=AllAdminMenu()
sub_menu1.name="Account >> Profile"
sub_menu1.title="Profile"
sub_menu1.url="/account/profile/"
sub_menu1.parent_menu=menu
sub_menu1.save()

#####
##################################################
##################################################
##################### Dashboard ######################
##################################################
from Website.models import *
app=AllApp()
app.name="Dashboard"
app.url="/account/dashboard/"
app.is_product=True
app.save()
####
menu_group=AdminMenuGroup()
menu_group.name="Dashboard"
menu_group.app=app
menu_group.order=0
menu_group.save()
####
menu=AllAdminMenu()
menu.name="MainMenu >> Dashboard"
menu.title="Dashboard"
menu.url="/account/dashboard/"
menu.menu_group=menu_group
menu.save()

#####
##################################################