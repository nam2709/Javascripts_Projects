from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def IndexNew(request, newContext={}, *args, **kwargs):
    # context = AdminWebContext(request, page_info='Portal:IndexNew', *args, **kwargs)
    context = {}
    context.update(newContext)

    template = loader.get_template(str('Portal/front/index.html'))

    print(request.method)
    if request.method == "POST":
        try:
            signup_email = request.POST['email']
            print('signup_email = %s' % signup_email)
            context['signup_email'] = signup_email
            from Account.views import Signup
            request.method = "GET"
            return Signup(request, context)
        except Exception as xx:
            print('[Portal:IndexNew] ERROR:' % str(xx))
            pass
    return HttpResponse(template.render(context, request))
