#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2021 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 3 / 8 / 21
#endregion

#
#
# __init__.py

import os
from selenium.common.exceptions import WebDriverException

import time
#### SELENIUM
from selenium import webdriver

# from selenium.webdriver.firefox.webelement import FirefoxWebElement

# pip install chromedriver-binary

#### END SELENIUM
import base64
from Tools.tnd_tools import gen_image_id

def brStart(driver='firefox', option=None):
    try:
        if driver == 'firefox':
            return webdriver.Firefox()
        elif driver == 'chrome':
            return webdriver.Chrome()
    except Exception as xx:
        print(str(xx))
        return None

def brGetElements(br, id=None, tag=None, cls=[], text=None, href=None):
    if text is not None:
        text = str(text).strip().lower()

    if isinstance(cls, str) is True:
        cls = str(cls).split()
        print('Converted string to []...: %s' % cls)
    results = []
    if id is not None:
        print('Checking id = %s' % id)
        results = br.find_elements_by_id(id)
    elif href is not None:
        print('Checking href = %s' % href)
        results = br.find_elements_by_xpath('//a[@href="'+href+'"]')
    else:
        if tag is None:
            print('Tag is None...')
            if len(cls) == 0:
                print('Len(cls) = 0...')
                if text is None:
                    results = []
                else:
                    results = br.find_elements_by_xpath("//*[contains(text(), '%s')]" % text)
            else:
                results = []
                if text is None:
                    print('Text is... None')
                    if len(cls) == 1:
                        results = br.find_elements_by_class_name(cls[0])
                    else:
                        for c in cls:
                            print('Checking class: %s' % c)
                            ax = br.find_elements_by_class_name(c)
                            for a in ax:
                                try:
                                    all_classes = a.get_attribute('class').split()
                                    if all_classes.sort() == cls.sort() and a not in results:
                                        results.append(a)
                                except Exception as xx:
                                    print(str(xx))
                else:
                    print('Find text... %s' % text)
                    if len(cls) == 1:
                        print('Len(cls) is... 1')
                        temps = br.find_elements_by_class_name(cls[0])
                        for t in temps:
                            try:
                                if str(t.text).strip() == text and t not in results:
                                    results.append(t)
                            except Exception as xx:
                                print(str(xx))
                    else:
                        for c in cls:
                            print('Checking class: %s' % c)
                            ax = br.find_elements_by_class_name(c)
                            if len(ax) == 0:
                                print('Not found any element with class: %s' % c)
                            else:
                                for a in ax:
                                    if str(a.text).strip() is "":
                                        continue
                                    print('==> Checking text... %s' % str(a.text).strip())
                                    if str(a.text).strip() == text:
                                        try:
                                            all_classes = a.get_attribute('class').split()
                                            if all_classes.sort() == cls.sort() and a not in results:
                                                results.append(a)
                                        except Exception as xx:
                                            print(str(xx))
                                    else:
                                        continue
        else:
            print('Checking tag = %s' % tag)
            results = []
            if len(cls) == 0:
                if text is None:
                    results = br.find_elements_by_tag_name(tag)
                else:
                    temps = br.find_elements_by_tag_name(tag)
                    for t in temps:
                        if str(t.text).strip() == text and t not in results:
                            results.append(t)
            else:
                results = []
                if text is None:
                    if len(cls) == 1:
                        print('Len(cls) = 1...')
                        temps = br.find_elements_by_class_name(cls[0])
                    else:
                        temps = []
                        for c in cls:
                            try:
                                print('Checking class: %s' % c)
                                ax = br.find_elements_by_class_name(c)
                                if len(ax) == 0:
                                    print('Not found any elements with class name: %s' % c)
                                else:
                                    for a in ax:
                                        try:
                                            all_classes = a.get_attribute('class').split()
                                            if all_classes.sort() == cls.sort() and a not in temps:
                                                temps.append(a)
                                        except Exception as xx:
                                            print(str(xx))
                            except Exception as rx:
                                print(str(rx))
                    for t in temps:
                        try:
                            outerhtml = t.get_attribute('outerHTML') # to extract outerHTML
                            tag_value=outerhtml.split(' ',1)[0][1:] # to extract first word
                            print('Checking tag_value = %s' % tag_value)
                            if tag_value == tag and t not in results:
                                results.append(t)
                        except Exception as rx:
                            print(str(rx))
                else:
                    print("################################################")
                    for c in cls:
                        print('Checking tag [%s] and class [%s]...' % (tag, c))
                        temps = br.find_elements_by_class_name(c)
                        for t in temps:
                            try:
                                all_classes = t.get_attribute('class').split()
                                if all_classes.sort() == cls.sort() and str(t.text).strip().lower() == str(text).lower():
                                    outerhtml = t.get_attribute('outerHTML') # to extract outerHTML
                                    tag_value=outerhtml.split(' ',1)[0][1:] # to extract first word
                                    print('Checking tag_value = %s' % tag_value)
                                    if tag_value == tag and t not in results:
                                        results.append(t)
                                        print('added...t.text = %s' % t.text)
                            except Exception as xx:
                                print(str(xx))
                    print("################################################")
    return results

def brClick(br, ele, timeout=0.5):
    try:
        # if (isinstance(br, webdriver.Firefox) or isinstance(br, FirefoxWebElement)) and isinstance(ele, FirefoxWebElement):
        try:
            ele.click()
            time.sleep(timeout)
        except Exception as xx:
            print(str(xx))
            try:
                br.execute_script("arguments[0].scrollIntoView()", ele)
            except Exception as ex:
                print(str(ex))
            br.execute_script("arguments[0].click()", ele)
            print('Clicked... %s' % ele.text)
    except Exception as xx:
        print(str(xx))

def brScrollToEnd(br):
    if isinstance(br, webdriver.Firefox):
        try:
            br.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(10)
        except Exception as xx:
            print(str(xx))
    else:
        print('ERROR: br is not "webdriver"')

def findAndClick(br, id=None, tag=None, cls=[], text=None, href=None):
    results = brGetElements(br, id=id, tag=tag, cls=cls, text=text, href=href)
    if len(results) > 0:
        brClick(br, results[0])

def findAndClicks(br, id=None, tag=None, cls=[], text=None, delay=1, href=None):
    results = brGetElements(br, id=id, tag=tag, cls=cls, text=text, href=href)
    if len(results) > 0:
        for ele in results:
            brClick(br, ele)
            time.sleep(delay)

def brAlert(br, message=None, delay=3):
    if isinstance(br, webdriver.Firefox):
        try:
            br.execute_script("alert('%s');" % message)
        except WebDriverException:
            pass
        time.sleep(delay)
        br.switch_to.alert.text # output is "qwer"
        br.switch_to.alert.accept() # alert closed
    else:
        print('ERROR: br is not "webdriver"')

def brToIframe(br, frameId=None):
    if frameId is None:
        try:
            br.switch_to.frame(br.find_element_by_tag_name("iframe"))
        except Exception as xx:
            print(str(xx))
    else:
        iframe_eles = br.find_elements_by_id(frameId)
        if len(iframe_eles) > 0:
            br.switch_to.frame(iframe_eles[0])
    return br

def brToMain(br):
    try:
        br.switch_to.default_content()
    except Exception as xx:
        print(str(xx))

def brSelect(br, eleId=None, option_text=None):
    if option_text is not None and eleId is not None:
        try:
            br.find_element_by_xpath("""//select[@id='""" + eleId + """']/option[text()='""" + option_text + """']""").click()
        except Exception as xx:
            print(str(xx))

def brFill(br, eleId=None, text=None):
    if text is not None and eleId is not None:
        try:
            ele = br.find_elements_by_id(eleId)
            if len(ele) > 0:
                ele[0].clear()
                ele[0].click()
                ele[0].send_keys(text)
        except Exception as xx:
            print(str(xx))

def brGetCaptchaImage(br, ele=None, outFilePath=None):
    # if isinstance(ele, FirefoxWebElement) and isinstance(br, webdriver.Firefox):
    img_captcha_base64 = br.execute_async_script("""
                            var ele = arguments[0], callback = arguments[1];
                            ele.addEventListener('load', function fn(){
                                ele.removeEventListener('load', fn, false);
                                var cnv = document.createElement('canvas');
                                cnv.width = this.width;
                                cnv.height = this.height;
                                ctx = cnv.getContext('2d');
                                ctx.fillStyle = "#FF0000";
                                ctx.drawImage(this, 0, 0);
                                callback(cnv.toDataURL('image/jpg').substring(22));
                                }, false);
                            ele.dispatchEvent(new Event('load'));
                            """, ele)
    # img_captcha_base64 = br.execute_script("""
    #                         var ele = arguments[0], callback = arguments[1];
    #                         ele.addEventListener('load', function fn(){
    #                             ele.removeEventListener('load', fn, false);
    #                             var cnv = document.createElement('canvas');
    #                             cnv.width = this.width;
    #                             cnv.height = this.height;
    #                             ctx = cnv.getContext('2d');
    #                             ctx.fillStyle = "#FF0000";
    #                             ctx.drawImage(this, 0, 0);
    #                             callback(cnv.toDataURL('image/jpg').substring(22));
    #                             }, false);
    #                         ele.dispatchEvent(new Event('load'));
    #                         """, ele)
    print('img_captcha_base64 = %s' % img_captcha_base64)
    if outFilePath is not None:
        tempfile_name = outFilePath
    else:
        tempfile_name = str('captcha-image-%s' % gen_image_id(12))
    tempfile = tempfile_name + '.jpg'
    with open(tempfile, 'wb') as f:
        f.write(base64.b64decode(img_captcha_base64))
        print('tempfile = %s' % tempfile)
    os.system('convert %s -background white -flatten -alpha off %s' % (tempfile, tempfile[:-4] + '.jpg'))
    return tempfile

def brGetImage(br, ele=None, outFilePath=None):
    # if isinstance(ele, FirefoxWebElement) and isinstance(br, webdriver.Firefox):
    if outFilePath is not None:
        tempfile_name = outFilePath
    else:
        tempfile_name = str('captcha-image-%s' % gen_image_id(12))
    tempfile = tempfile_name + '.png'
    ele.screenshot(tempfile)
    os.system('convert %s -background white -flatten -alpha off %s' % (tempfile, tempfile[:-4] + '.jpg'))
    return tempfile

# End of TFile



