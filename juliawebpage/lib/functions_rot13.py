def convert_rot13(string):
	abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
	rot13_string = []
	for letter in string:
		if letter.lower() in abc:
			index = abc.index(letter.lower())
			if index+13 > 25:
				index = index-26+13
			else: index = index+13
			if letter.isupper():
				rot13_string.append(abc[index].capitalize())
			else: rot13_string.append(abc[index])
		else: rot13_string.append(letter)
	return ''.join(rot13_string)