from bs4 import BeautifulSoup
from urllib import request
import json

open('devcomments.txt', 'a').close() # Create file
open('errors.txt', 'a').close() # Create file
open('page.txt', 'a').close() # Create file

####################################################
#################### MAIN CODE  ####################
####################################################

def request_data(webpage_url, start, end):
    """Main function that just access websites and send the content to the data gatherer.
    It send the errors to the error function, and the success to the save function.
    It also deals with the printing stuff so you are informed.
    """
    for x in range(start, end): # For each page between these indexes...
        print("START - Trying to save comments of page " + str(x))
        with open("page.txt", 'w') as page_update:
            page_update.write(str(x))
        built_address = webpage_url+"?page="+str(x) # Build the address
        webpage_request = request.urlopen(built_address) # Open the page
        status_code = webpage_request.getcode() # Get the page status
        if status_code == 200: # If it loaded without errors
            html = BeautifulSoup(webpage_request, "html.parser") # Parse the website
            posts = html.find_all('div', {'class': 'arenanet post'}) # Divide all the posts by Anet Class
            for index, post in enumerate(posts): # For each of the posts...
                data_gathered = data_gatherer(post) # Gather the data
                save_data(data_gathered) # And append it to the outputfile
                # Inform of this
                print("{} - {}".format(data_gathered[0], data_gathered[3]))
                # Also, save a copy of the item in the error file if any error was found.
                # Loop to not record the same thing several times if everything fails
                error_found = False
                for j in data_gathered:
                    if j == "ERROR":
                        error_found = True
                        break
                if error_found:
                    save_error(built_address, "POST", str(data_gathered))
        # Inform of Status code error
        else:
            save_error(built_address, "STATUS CODE", str(status_code))
        print("END - Page " + str(x) + " of comments saved.")
    # Inform that it all went as expected
    print("ALL the pages where archived.")

def data_gatherer(post):
    """This function tries to analyze the data to get the desired data."""
    # Topic
    try:
        topic = post.find('a', {'class': 'topic arenanet'}).getText()
    except:
        topic = "ERROR"
    # Author
    try:
        author = post.find('a', {'class': 'member arenanet'}).getText()
    except:
        author = "ERROR"
    # link
    try:
        link = base_page + post.find('a', {'class': 'permalink icon'}, href=True)['href']
    except:
        link = "ERROR"
    # Date
    try:
        date = post.find('time', {'class': 'changeabletime'}).getText()
    except:
        date = "ERROR"
	# Time
    try:
        time = post.find('time', {'class': 'changeabletime'})['datetime']
    except:
        time = "ERROR"
    # Content
    try:
        content = post.find('div', {'class': 'message-content'}).prettify().encode('ascii', 'backslashreplace')
    except:
        content = "ERROR"
    # Build a List
    return [time, date, topic, link, author, content]

def save_data(data):
    """This function just saves the data of a post into the database."""
    testt = data[5]
    content = testt.decode('ascii','backslashreplace')
    output = ''.join(('{ "time":"',data[0],'", "date":"',data[1], '","topic":"',data[2],'","link":"',data[3],'","author":"',data[4],'","content":"',content,'"}\n'))
	
	
    with open("devcomments.txt", 'a') as file_to_write:
        file_to_write.write(output)

def save_error(built_address, errordescription, error):
    """This function just saves the data of an error into the database."""
    with open("errors.txt", 'a') as file_to_write:
        data_to_save = ["Page: {}".format(built_address), "{} ERROR: {}".format(errordescription, error)]
        file_to_write.write(json.dumps(data_to_save))

#################################################
#################### OPTIONS ####################
#################################################
        
base_page = "https://forum-en.guildwars2.com" # Main url (to choose language)
webpage_url = base_page + "/forum/info/devtracker" # Sub-section
#start = 1 # At which page it starts
saved_page = open("page.txt", 'r')
continue_num = saved_page.readlines()

start = int(continue_num[0])
end = 684 # At what page it stops (set 1 more just in case)

#######################################################
#################### Initialize it ####################
#######################################################

request_data(webpage_url, start, end)
