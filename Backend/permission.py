from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options

service = Service("/mnt/data/programming/Secure-Sentinel/Backend/geckodriver")

options = Options()
options.headless = True  # CRITICAL in a headless environment

driver = webdriver.Firefox(service=service, options=options)
driver.get("https://example.com")
print(driver.title)
driver.quit()
