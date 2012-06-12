describe
(
	"is a test test suite",
	function()
	{
		it
		(
			"does some simmple assertions",
			function()
			{
				expect(3).toBe(3);
				expect('foo').toBe('foo');
				expect('foo').not.toBe('bar');
			}
		);
	}
);