import argparse
#import sys
import os.path
#import thread
import subprocess
import json
import re

""" Some Config """

DIR_STRAPPY		='..\\'
IGNORE_FOLDERS	=['.git','docs','tools']
IGNORE_FILES	=['min.js']

""" Main Compression Class """

class Compress:
	Name="Compress"
	
	def compressfileList(self,fileList):
		print 'Compressing the following files:'
		print fileList
		scripts='--js="'+'" --js="'.join(fileList)+'"'
		process=subprocess.Popen(
			'java '+
			'-jar '+
			'"'+os.path.join(os.path.realpath('.'),'compiler.jar')+'" '+
			scripts,
			stdout=subprocess.PIPE,
			stderr=subprocess.PIPE
		)
		result=process.communicate()
		
		
		if len(result[1]):
			print 'Errors found during compiling...'
			errors=[]
			for error in result[1].split('\r\n'):
				thisError=error.strip().strip('^')
				if len(thisError) and thisError.find('error(s)')==-1:
					print '--------------------'
					print thisError
					print '--------------------'
			return ''
		else:
			return result[0]
	
	
	def dirIterator(self, arg, dirname, fnames):
		for file in fnames:
			thisFile	=os.path.join(dirname, file)
			fileParts	=os.path.splitext(thisFile)
			dirParts	=fileParts[0].split('\\')
			doContinue	=False
			for dir in dirParts:
				for ignoreFile in IGNORE_FILES:
					if file.find(ignoreFile)!=-1:
						doContinue=True
						break
				
				if doContinue:
					break
				
				if dir in IGNORE_FOLDERS:
					doContinue=True
					break
				
					
			if doContinue:
				doContinue=False
				continue;
			
			if (fileParts[1]=='.js'):
				arg.append(thisFile)
	
	def writeResult(self,result,targetDir=None,outputFile=None):
		if targetDir==None:
			targetDir=os.path.abspath('.')
		else:
			targetDir=os.path.abspath(targetDir)
		
		if outputFile!=None:
			filePath=os.path.join(targetDir,outputFile)
			file=open(filePath,'w')
			file.write(result)
			file.close()
			print 'Successfully compressed and combined files...'
			print 'Result written to "'+os.path.abspath(filePath)+'"'
		#else:
		#	print result

	
	def compressFramework(self,configFile=None,targetDir=None):
		fileList	=[]
		if configFile==None:
			if targetDir:
				targetDir	=os.path.abspath(targetDir)
				configFile	=os.path.join(targetDir,'compile.json')
				if os.path.isfile(configFile):
					print 'Found compile.json file. Using that instead.'
					file	=open(configFile, 'r')
					config	=json.loads(file.read())
					for file in config['files']:
						fileList.append(os.path.abspath(os.path.join(targetDir,file)))
				else:
					print 'Could not find compile.json file.'
					os.path.walk(os.path.abspath(DIR_STRAPPY),self.dirIterator,fileList)
			else:
				os.path.walk(os.path.abspath(DIR_STRAPPY),self.dirIterator,fileList)
		else:
			file	=open(configFile, 'r')
			config	=json.loads(file.read())
			for file in config['files']:
				fileList.append(os.path.abspath(os.path.join(targetDir,file)))
		
		return self.compressfileList(fileList)



""" Command Line Stuff """

parser=argparse.ArgumentParser()
parser.add_argument('-c',		'--config',		help='Specify a config file.')
parser.add_argument('-d',		'--dir',		help='A directory to start at.')
parser.add_argument('-f',		'--file',		help='Specify a file where the result will be output.')

args=parser.parse_args()

result=''

if args.dir!=None:
	targetDir=os.path.abspath(args.dir)
else:
	targetDir=os.path.abspath('.')

if args.config:
	compressor=Compress()
	result+=compressor.compressFramework(
		configFile	=args.config,
		targetDir	=args.dir
	)

compressor.writeResult(
	result		=result,
	targetDir	=targetDir,
	outputFile	=args.file
)