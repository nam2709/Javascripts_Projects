__author__ = 'root'
# Create your views here.
from sys import _getframe

from django.http import HttpResponseRedirect
from django.urls import reverse

from Logger.admin import log_write
from Account.models import Account

def process_post(request, slug=None):
    all_data = request.POST
    context = {}
    context['web_alerts'] = []
    temp={}
    temp['level'] = 'INFO'
    if request.user.is_authenticated:
        if request.user.is_superuser and slug is not None:
            checker = Account.objects.filter(username=slug).first()
        else:
            checker = Account.objects.filter(username=request.user.username).first()

        if checker is not None:
            current_user = checker
            action = all_data['action']
            log_write(msg=str('action = %s' % action), request=request, func_name=_getframe().f_code.co_name)
            context['result'] = None
            if action == 'search-log':
                try:
                    search_by = all_data['search-by']
                    print('search_by = %s' % search_by)
                    context['search_by'] = search_by

                    search_content = all_data['search-content']
                    print('search_content = %s' % search_content)
                    context['search_content'] = search_content

                    if search_by == 'by-app':
                        context['result'] = HttpResponseRedirect(reverse('Logger:AllLogsByAppView', kwargs={'slug': search_content}))
                    elif search_by == 'by-class':
                        context['result'] = HttpResponseRedirect(reverse('Logger:AllLogsByClassView', kwargs={'slug': search_content}))
                    elif search_by == 'by-func':
                        context['result'] = HttpResponseRedirect(reverse('Logger:AllLogsByFunctionView', kwargs={'slug': search_content}))
                    elif search_by == 'by-level':
                        context['result'] = HttpResponseRedirect(reverse('Logger:AllLogsByLevelView', kwargs={'slug': search_content}))
                    elif search_by == 'by-name':
                        context['result'] = HttpResponseRedirect(reverse('Logger:AllLogsByNameView', kwargs={'slug': search_content}))
                    elif search_by == 'by-user':
                        context['result'] = HttpResponseRedirect(reverse('Logger:AllLogsByUserView', kwargs={'slug': search_content}))
                except Exception as px:
                    print(all_data)
                    print(str(px))
                    pass
            elif action == 'search-log':

                try:
                    pass
                except Exception as px:
                    pass
    return(context)
